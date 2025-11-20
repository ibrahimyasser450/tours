const express = require('express');
const {
  getCheckoutSession,
  getCheckoutSessionForAdmin,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  checkBooking,
} = require('../controllers/bookingController');

const { protect, restrictTo } = require('../controllers/authController');

// mergeParams allows us to access the params from the parent route or other routes like accessing tourId
const router = express.Router({ mergeParams: true });

router.use(protect);

// Normal user booking tours
router
  .route('/checkout-session/:tourId/:date/:price')
  .get(checkBooking, getCheckoutSession);

// Admin booking tour for specific user
router
  .route('/checkout-session/:tourId/:date/:price/:userId')
  .get(
    restrictTo('admin', 'lead-guide'),
    checkBooking,
    getCheckoutSessionForAdmin,
  );

router.route('/:userId/:tourId/bookings').get(getAllBookings);

router.use(restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
