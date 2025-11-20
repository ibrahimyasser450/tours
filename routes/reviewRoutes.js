const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
  checkBookedBeforeReview,
  checkChangedReview,
} = require('../controllers/reviewController');

const { protect, restrictTo } = require('../controllers/authController');

// mergeParams allows us to access the params from the parent route or other routes like accessing tourId
const router = express.Router({ mergeParams: true });

// protect all routes after this middleware if the user is protected can access any route after this
router.use(protect);

// POST /tours/234fad4/reviews => createReview
// GET /tours/234fad4/reviews => getAllReviews
router
  .route('/')
  .get(getAllReviews)
  .post(checkBookedBeforeReview, setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), checkChangedReview, updateReview)
  .delete(deleteReview);

module.exports = router;
