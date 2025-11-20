const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price'],
  },
  numbersOfPeople: {
    type: Number,
    required: [true, 'Booking must have a number of people'],
  },
  tourDate: {
    type: Date,
    required: [true, 'Booking must have a tour date'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: '-__v -confirmedEmail' }).populate({
    path: 'tour',
    select:
      'name price duration maxGroupSize ratingsAverage imageCover summary startLocation',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
