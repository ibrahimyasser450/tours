const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
  validateTour,
  checkTourName,
} = require('./../controllers/tourController');

const { protect, restrictTo } = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const bookingRouter = require('./bookingRoutes');

const router = express.Router();

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);
router.route('/tours-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(getDistances);
router.route('/').get(getAllTours).post(
  protect,
  restrictTo('admin', 'lead-guide'),
  uploadTourImages,
  validateTour, // second middleware to can get the values from req.body
  resizeTourImages,
  createTour,
);
router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour,
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router
  .route('/checkTourName/:name')
  .get(protect, restrictTo('admin', 'lead-guide'), checkTourName);

// POST /tours/234fad4/reviews
// GET /tours/234fad4/reviews
// GET /tours/234fad4/reviews/234fad4

// when found this route [/:tourId/reviews], it will go to reviewRouter if method post do createReview if get do getAllReviews
router.use('/:tourId/reviews', reviewRouter);
router.use('/:tourId/bookings', bookingRouter);

module.exports = router;
