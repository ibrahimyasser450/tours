const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Every request after login automatically updates lastActiveAt and active.
module.exports = (thresholdMs = 60 * 1000) => {
  return async (req, res, next) => {
    try {
      // 1️⃣ Get token from cookies or headers
      let token;
      if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token || token === 'loggedout' || token === 'undefined')
        return next();

      // 2️⃣ Verify token (don’t throw if invalid)
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );

      if (!decoded || !decoded.id) return next();

      // 3️⃣ Check if user exists
      const user = await User.findById(decoded.id).select(
        'lastActiveAt active',
      );
      if (!user) return next();

      // 4️⃣ Update once per minute only
      const now = Date.now();
      const last = user.lastActiveAt ? user.lastActiveAt.getTime() : 0;

      if (now - last > thresholdMs || !user.active) {
        await User.findByIdAndUpdate(user._id, {
          active: true,
          lastActiveAt: new Date(now),
        });
      }
    } catch (err) {
      return next(new AppError('Token is invalid or has expired', 500));
    }
    next();
  };
};
