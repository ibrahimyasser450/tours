const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.checkBookedBeforeReview = catchAsync(async (req, res, next) => {
  let tourId = req.params.tourId;
  let userId = req.user.id;
  if (req.user.role === 'admin') {
    tourId = req.body.tour;
    userId = req.body.user;
  }
  const reviews = await Review.find({
    tour: tourId,
    user: userId,
  });
  // 1 means ascending order so first element is the oldest date [smallest date]
  const bookings = await Booking.find({
    tour: tourId,
    user: userId,
  }).sort({ tourDate: 1 });
  // for admin
  if (!bookings.length)
    return next(new AppError('This user not booked this tour yet.', 400));
  const currentDate = new Date();
  const tourDate = bookings[0].tourDate;
  const tourName = bookings[0].tour.name;
  const date = tourDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  // if user has already submitted a review
  if (reviews.length) {
    return next(
      new AppError(
        'You cannot submit another review. Only one review is allowed.',
        400,
      ),
    );
  }
  // if not reviewed and has more than 1 booking get older date for this tour it is meaning has older date [past] so get him and compare with current date if he has past date so he can review because Of course the user tried this tour.
  if (tourDate >= currentDate) {
    return next(
      new AppError(`You can only review ${tourName} after ${date}.`, 400),
    );
  }

  // create review
  next();
});

exports.checkChangedReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  const oldReview = review.review;
  const newReview = req.body.review;
  const oldRating = review.rating;
  const newRating = Number(req.body.rating);

  if (oldReview === newReview && oldRating === newRating) {
    return next(
      new AppError(
        'You cannot submit the same review with the same rating. Please change something.',
        400,
      ),
    );
  }
  next();
});

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id; // req.user comes from protect middleware in authController
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
