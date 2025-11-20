const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // parent reference => parent is tour and child is review, if review is created must belong to a tour
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    // parent reference => parent is user and child is review, if review is created must be written by the user
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must be written by the user'],
    },
  },
  {
    toJSON: { virtuals: true }, // each time we get data out from db, it will be part of the output
    toObject: { virtuals: true }, // get data as object
  },
);

// to make sure that each user can only write one review for each tour and each tour can have only one review from each user
// one user can only write one review for one tour but one user can write many reviews for many different tours
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'name imageCover',
  }).populate({
    path: 'user',
    select: 'name email photo ',
  });
  // this.populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  next();
});

// i want to calculate average ratings and number of ratings that we have in review for each tour
// get all reviews for specific tour and calculate average ratings and number of ratings
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// post middleware => i used it to calculate average ratings after saving a review in db
// this.constructor => used because we using static method[calcAverageRatings]
reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// for updating or deleting review => findOneAndUpdate is equal findByIdAndUpdate and it is the same with findOneAndDelete
// i used pre middleware to get the review and to can use the query
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // this.getQuery() => get query object of review id that we want to update or delete
  this.r = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
