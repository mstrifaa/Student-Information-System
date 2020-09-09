const crypto = require('crypto');
const { promisify } = require('util'); // built in promise function
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    student_id: req.body.student_id,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)check if email & password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  //2)check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password'); //here select is used to select the hidden password in database
  //await user.correctPassword(password,user.password) is calling instance method
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3)if everything ok,send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1)getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  //2)verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this id does no longer exist.', 401)
    );
  }

  //4)check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    //iat is issued at method
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin','moderator']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   //1)get user based on posted Email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('There is no user with this email', 404));
//   }
//   //2)generate random reset Token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//
//   //3)send it to user's email
//   const resetURL = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/users/resetPassword/${resetToken}`;
//
//   const message = `Forgot your password?Submit a PATCH request with your new password and passwordConfirm to ${resetURL}`;
//   // await sendEmail({
//   //   email: user.email,
//   //   subject: 'Your password reset token (valid for 10 min)',
//   //   message
//   // });
//
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Your password reset token (valid for 10 min)',
//       message
//     });
//
//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email'
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(
//       new AppError('There was an error sending the email.Try again later', 500)
//     );
//   }
// });
//
// exports.resetPassword = catchAsync(async (req, res, next) => {
//   //1)get user based on Token
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() }
//   });
//
//   //2)if token is not expired and there is user,set new password
//   if (!user) {
//     return next(new AppError('Token is invalid or has expired', 400));
//   }
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//
//   //3)update change passwordChangedAt for the user
//
//   //4)log the user in,send JWT
//   createSendToken(user, 200, res);
// });

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1)get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //2)check if posted password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  //3)if so,update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4)log user in & send jwt
  createSendToken(user, 200, res);
});
