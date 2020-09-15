const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
exports.getHomepage = (req, res) => {
  res.status(200).render('base');
};

exports.getLogin = (req, res) => {
  res.status(200).render('login');
};

exports.getSignup = (req, res) => {
  res.status(200).render('registration');
};

exports.getResult = catchAsync(async (req, res) => {
  const myinfo = await User.findOne({ _id: { $eq: req.user._id } }).populate({
    path: 'results'
  });
  // console.log(myinfo.results);
  res.status(200).render('results', {
    myinfo
  });
});

exports.getProfile = catchAsync(async (req, res) => {
  const myinfo = await User.findOne({ _id: { $eq: req.user._id } }).populate({
    path: 'results'
  });
  // console.log(myinfo.results.length);
  // console.log(req.user._id);
  // res.status(200).json({
  //   myinfo
  // });
  res.status(200).render('profile', {
    myinfo
  });
});

exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard');
};

exports.getCourseReg = (req, res) => {
  res.status(200).render('course_reg');
};

exports.changePassword = (req, res) => {
  res.status(200).render('change_password');
};
