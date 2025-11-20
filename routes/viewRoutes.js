const express = require('express');

const {
  isLoggedIn,
  protect,
  restrictTo,
  confirmEmail,
} = require('./../controllers/authController');
const {
  updateBooked,
  createBookingCheckout,
} = require('./../controllers/bookingController');

const {
  getOverview,
  getTour,
  getSignupForm,
  getConfirmEmail,
  getLoginForm,
  getProfile,
  updateUserData,
  getAllBookings,
  getMyFavoriteTours,
  getReviewForm,
  getMyReviews,
  getReview,
  getData,
  addData,
  viewData,
  updateData,
} = require('./../controllers/viewsController');

const router = express.Router();

// when write http://localhost:3000/ or http://127.0.0.1:3000/ and response is ok will return overview.pug

// you can do any of them without be logged in
router.route('/').get(createBookingCheckout, isLoggedIn, getOverview);
router.route('/tour/:slug').get(isLoggedIn, updateBooked, getTour);
router.route('/signup').get(isLoggedIn, getSignupForm);
router.route('/login').get(isLoggedIn, getLoginForm);
router.route('/confirm-email').get(getConfirmEmail);
router.route('/confirm-email/:token').get(confirmEmail);
// must be logged in to do any of them
router.route('/profile').get(protect, getProfile);
// router.route('/my-tours').get(protect, getMyTours);
router.route('/my-bookings').get(protect, getAllBookings);
router.route('/my-favorites-tours').get(protect, getMyFavoriteTours);
router.route('/:slug/create-review').get(protect, getReviewForm);
router.route('/my-reviews').get(protect, getMyReviews);
router.route('/review/:id').get(protect, getReview);

// if we used without api at account.pug
router.route('/submit-user-data').post(protect, updateUserData);

router.route('/dashboard/:section').get(protect, getData);
router.route('/add/:section').get(protect, addData);
router.route('/view/:section/:id').get(protect, viewData);
router.route('/update/:section/:id').get(protect, updateData);

module.exports = router;
