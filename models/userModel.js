const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: [true, 'Enter your Student ID'],
      unique: true
    },
    dept: {
      type: String,
      required: [true, 'Enter your department!']
    },
    nationality: {
      type: String,
      required: [true, 'Enter your nationality!']
    },
    name: {
      type: String,
      required: [true, 'Enter your name!']
    },
    email: {
      type: String,
      required: [true, 'Enter your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid Email!']
    },
    photo: String,
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
      default: 'student'
    },
    password: {
      type: String,
      required: [true, 'Enter a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Confirm your password'],
      validate: {
        //this only works on CREATE and SAVE
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not same!'
      }
    },
    gender: {
      type: String,
      required: [true, 'Enter a gender']
    },
    dob: {
      type: String,
      required: [true, 'Enter a date of birth']
    },
    phone: {
      type: String,
      required: [true, 'Enter a phone']
    },
    present_address: {
      type: String,
      required: [true, 'Enter a present Address']
    },
    father_name: {
      type: String,
      required: [true, "Enter father's name"]
    },
    father_profession: {
      type: String,
      required: [true, 'Enter father profession']
    },
    father_phone: {
      type: String,
      required: [true, 'Enter father phone']
    },
    mother_name: {
      type: String,
      required: [true, 'Enter mother name']
    },
    mother_profession: {
      type: String,
      required: [true, 'Enter mother profession']
    },
    mother_phone: {
      type: String,
      required: [true, 'Enter a mother phone']
    },
    guardian_name: {
      type: String,
      required: [true, 'Enter a guardian name']
    },
    guardian_phone: {
      type: String,
      required: [true, 'Enter a guardian phone']
    },
    guardian_address: {
      type: String,
      required: [true, 'Enter a guardian address']
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//virtual populate
userSchema.virtual('results', {
  ref: 'Result',
  foreignField: 'user',
  localField: '_id'
});

//hash password by using document middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

//instance method to check validitiy of password when logging in.instance method is available on all document of a collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 //this 10 denotes base 10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //resetToken expires in 10 mins
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
