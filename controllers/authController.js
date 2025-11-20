/* eslint-disable */
const validator = require('validator');
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // jwt => variable, token => value, httpOnly => true means cannot access or modify in any way by the browser [client side], secure => true means https and only send on encrypted connection like https
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  // if (redirectUrl) {
  //   res.redirect(redirectUrl);
  // }

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.validateSignup = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const isEmailExist = await User.findOne({ email });
  const errors = [];

  // Example validation checks
  if (!name || name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required.' });
  }
  // /\S+@\S+\.\S+/.test(email) => should include letters, numbers + @ + .
  if (!email || email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (isEmailExist) {
    errors.push({ field: 'email', message: 'Email already exists.' });
  }
  if (!password || password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required.' });
  } else if (!validator.isStrongPassword(password)) {
    errors.push({
      field: 'password',
      message:
        'Password must be strong. Please include at least 8 characters, one uppercase, one lowercase, one number, and one special character.',
    });
  }
  if (!passwordConfirm || passwordConfirm.trim() === '') {
    errors.push({
      field: 'password-confirm',
      message: 'Password confirmation is required.',
    });
  }
  if (password !== passwordConfirm) {
    errors.push({
      field: 'password-confirm',
      message: 'Passwords do not match.',
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.signup = catchAsync(async (req, res, next) => {
  // try {
  const { name, email, password, passwordConfirm, role } = req.body;
  // to save only fields we want and any other fields will be ignored and the admin can add any fields by using mongoDB compass
  // the user cannot register as admin, if we need to add new admin, go and create a new user and go to mongoDB compass and edit role from user to admin manually
  const emailToken = crypto.randomBytes(32).toString('hex');
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
    emailConfirmToken: crypto
      .createHash('sha256')
      .update(emailToken)
      .digest('hex'),
    emailConfirmExpires: Date.now() + 3 * 24 * 60 * 60 * 1000, // Valid for 3 days
  });

  // 3) Send it to user's email
  try {
    // req.protocol => http or https, req.get('host') => localhost:3000
    const confirmUrl = `${req.protocol}://${req.get('host')}/confirm-email/${emailToken}`;
    await new Email(newUser, confirmUrl).sendWelcome();

    res.status(200).json({
      status: 'success',
      message: 'Please check your email to confirm your email address.',
    });
  } catch (err) {
    newUser.emailConfirmToken = undefined;
    newUser.emailConfirmExpires = undefined;
    await newUser.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailConfirmToken: hashedToken,
    emailConfirmExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Activate user and clear confirmation token fields
  user.confirmedEmail = true;
  user.emailConfirmToken = undefined;
  user.emailConfirmExpires = undefined;
  user.active = true;
  user.lastActiveAt = Date.now();
  await user.save({ validateBeforeSave: false });

  // when i want to test on postman
  // createSendToken(user, 200, res);

  // createSendToken(user, 200, res, '/');
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  });

  res.redirect('/');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (user.confirmedEmail === false) {
    const isEmailNotExpired = user.emailConfirmExpires > Date.now();
    if (isEmailNotExpired) {
      return next(
        new AppError(
          'Please confirm your email address before logging in.',
          401,
        ),
      );
    }
    return next(
      new AppError('The user does no longer exist. Please sign up.', 401),
    );
  }

  user.active = true;
  user.lastActiveAt = Date.now();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

exports.logout = async (req, res, next) => {
  try {
    let userId;
    const token = req.cookies.jwt;

    if (token && token !== 'loggedout' && token !== 'undefined') {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        return next(new AppError('Token is invalid or has expired', 400));
      }
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        active: false,
        lastActiveAt: Date.now(),
      });
    }

    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ status: 'success' });
  } catch (err) {
    return next(new AppError('Error logging out. Please try again.', 500));
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  // console.log('🔴 Protect Middleware Called', req.originalUrl);
  // 1) Getting token and check if it's there
  // console.log(req.cookies.jwt);
  let token; // authorization => 'Bearer token'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError(
        'You are not logged in or your token is expired. Please log in again.',
        401,
      ),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists because the token expired after 90 days
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  // iat => creation time, exp => expiration time
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // set current user to req to use in other routes
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // there is a logged in user
      // res.locals => make global variable called user in each pug template
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  // because it do validation with all fields, so we need to disable it
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token and  encrypt token to match with token in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Check if the token is valid meaning it's not expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token is not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  // set the new password and delete the token and expire and do validation with all fields
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user, passwordChangedAt will be smaller one second then token creation time.
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password[old] is correct meaning equals the password in DB
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  if (req.body.password === req.body.passwordCurrent) {
    return next(
      new AppError('New password cannot be the same as current Password.', 400),
    );
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // user.findByIdAndUpdate(req.user.id); not work because pre save middleware will not working, not hash password

  // 4) Log user in, send JWT, when created token it is same when user logged in
  createSendToken(user, 200, res);
});
