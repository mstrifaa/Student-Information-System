const Result = require('./../models/resultModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllResults = catchAsync(async (req, res, next) => {
  const results = await Result.find();
  var arr = [];
  results.forEach(item => {
    if (item.user.id === req.user.id) arr.push(item);
    // console.log(item.user);
  });

  // console.log(arr);
  res.status(200).json({
    status: 'success',
    data: {
      arr
    }
  });
});

exports.createResult = catchAsync(async (req, res, next) => {
  const newResult = await Result.create(req.body);
  // console.log(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      newResult
    }
  });
});
