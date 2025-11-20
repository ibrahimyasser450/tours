const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateProfile,
  deleteMyAccount,
  uploadUserPhoto,
  resizeUserPhoto,
  favoriteTour,
  checkEmail,
} = require('./../controllers/userController');
const {
  validateSignup,
  signup,
  login,
  logout,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('./../controllers/authController');
const bookingRouter = require('./bookingRoutes');

const router = express.Router();
router.route('/signup').post(validateSignup, signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

// Protect all routes after this middleware if the user is protected can access any route after this , ex: if i want to run update password it will run first protect middleware then update password
router.use(protect);
router.route('/updatePassword').patch(updatePassword);
router
  .route('/updateProfile')
  .patch(uploadUserPhoto, resizeUserPhoto, updateProfile);
router.route('/deleteMyAccount').delete(deleteMyAccount);
router.route('/me').get(getMe, getUser);
router.patch('/favorite-tour', favoriteTour);

// after protect middleware run restrictTo middleware to check if the user is admin => only admin can access any route after this
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.route('/checkEmail/:email').get(checkEmail);

router.use('/:userId/bookings', bookingRouter);

module.exports = router;
