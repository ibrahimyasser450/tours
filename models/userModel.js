const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { type } = require('os');
const { bool } = require('sharp');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'lead-guide', 'guide', 'admin'],
    default: 'user',
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
    // if we want strong password
    validate: [
      validator.isStrongPassword,
      'Password must be strong. Please add at least 8 characters, one uppercase, one lowercase, one number and one special character',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        // ✅ Only run on CREATE or SAVE
        return el === this.password;
      },
      message: 'Confirm Password does not match password',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false, // means currently offline
    // select: false,
  },
  accountActive: {
    type: Boolean,
    default: true, // means account is valid, not deleted
    // select: false,
  },
  lastActiveAt: Date,
  emailConfirmToken: String,
  emailConfirmExpires: Date,
  confirmedEmail: {
    type: Boolean,
    default: false, // when do delete for all data and add all data, make the value true
  },
  favoriteTours: [{ type: mongoose.Schema.ObjectId, ref: 'Tour' }], // Store tour IDs
});

// Only run this function if password was actually modified
userSchema.pre('save', async function (next) {
  // if password is not modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  // if password is not modified or the document is new
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.populate('favoriteTours');
//   next();
// });

userSchema.pre(/^find/, function (next) {
  // return all users that are active
  this.find({ accountActive: { $ne: false } });
  next();
});

// when user logged out so before change active to false update lastActiveAt to current time
// userSchema.pre('save', function (next) {
//   if (this.isModified('active') && this.active === true) {
//     this.lastActiveAt = Date.now();
//   }
//   next();
// });

// make sure password is correct when user trying to login or update password check current password[old] equals the password in DB
userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword,
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// Check if password was changed after the token was issued so that user can't use old token so the user should log in again
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create password reset token, it is expired in 10 minutes
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token, shouldn't store it in DB because it's not encrypted so anyone can see and use it to change password and use the account
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Encrypt the token so you can store it in DB like password
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // expire the token in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema); // 'User' is the name of the collection (table)

module.exports = User;
