const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getStudentId = catchAsync(async (req, res, next) => {
  let query = await User.findOne({ student_id: { $eq: req.body.student_id } });
  req.body.user = query._id;
  // console.log(query.name);
  next();
});

//this update is for user
exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update.', 400));
  }

  //2)update user document
  const filterBody = filterObj(
    req.body,
    'present_address',
    'phone',
    'guardian_phone',
    'guardian_address',
    'father_phone',
    'mother_phone'
  );
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'results' });
// updateUser is only for admin don't update password with this because findByIdAndUpdate doesn;t run all the save middlewares
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
