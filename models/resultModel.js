const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: [true, 'Enter semester']
    },
    course_code: {
      type: String,
      required: [true, 'Course Code cannot be empty!']
    },
    course_name: {
      type: String,
      required: [true, 'Course name cannot be empty!']
    },
    grade: {
      type: String,
      required: [true, 'Grade cannot be empty']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Result must belong to user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

resultSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
