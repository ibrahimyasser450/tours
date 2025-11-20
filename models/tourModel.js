const mongoose = require('mongoose');
const slugify = require('slugify');
const Booking = require('./bookingModel');
const Review = require('./reviewModel');
const User = require('./userModel');
// const validator = require('validator');
// const User = require('./userModel');

// first argument is schema definition and second argument is object options
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'], // only these values are allowed
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.66666 => 46.6666 => 47 => 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true, // removes white spaces
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    // images: [String], // array of strings
    images: {
      type: [String],
      required: [true, 'A tour must have images'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 3;
        },
        message: 'A tour must have three image',
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
      // select: false, // hide this field from client
    },
    // startDates: [
    //   {
    //     date: {
    //       type: String,
    //       required: [true, 'A tour must have a date to can users book it'],
    //     },
    //     soldOut: { type: Boolean, default: false },
    //     bookedPersons: { type: Number, default: 0 },
    //   },
    // ],
    startDates: {
      type: [
        {
          date: {
            type: String,
            required: [true, 'A tour must have a date so users can book it'],
          },
          soldOut: { type: Boolean, default: false },
          bookedPersons: { type: Number, default: 0 },
        },
      ],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: 'A tour must have at least one start date',
      },
    },

    secretTour: {
      type: Boolean,
      default: false,
    },
    // startLocation: {
    //   // GeoJSON
    //   type: {
    //     type: String,
    //     default: 'Point',
    //     enum: ['Point'],
    //   },
    //   coordinates: [Number],
    //   address: String,
    //   description: String,
    // },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: [true, 'A tour must have a location type'],
      },
      coordinates: {
        type: [Number],
        required: [true, 'A tour must have coordinates'],
      },
      address: {
        type: String,
        required: [true, 'A tour must have an address'],
      },
      description: {
        type: String,
        required: [true, 'A tour must have a description'],
      },
    },

    // embedded document
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // embedded document => guides means users, array of users
    // guides: Array,
    // child referencing => array of user ids => user [child] and tour [parent]
    guides: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        bookings: [
          {
            date: {
              type: Date,
            },
            bookedPersons: {
              type: Number,
              min: [1, 'At least one person should be booked'],
            },
          },
        ],
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // each time we get data out from db, it will be part of the output
    toObject: { virtuals: true }, // get data as object
  },
);

// index => create index in database to speed up queries and improve performance of queries [most common queries]
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// virtual property that is not stored in db and created each time we get data out from db
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// virtual populate => get reviews for each tour without save it in Tour database
// reviews => field name [array of reviews], Review [child] database name and tour foreign key or foreign field that have the tour id in Review database, local field that have the tour id in Tour database
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// document middleware pre => runs before an actual event => .save() and .create() only means that this function will run before the document save to db
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// 🧹 Cascade delete related documents
tourSchema.pre('findOneAndDelete', async function (next) {
  const tourId = this.getQuery()._id;

  // 1️⃣ Delete all bookings for this tour
  await Booking.deleteMany({ tour: tourId });

  // 2️⃣ Delete all reviews for this tour
  await Review.deleteMany({ tour: tourId });

  // 3️⃣ Remove this tour from all users’ favoriteTours arrays
  await User.updateMany(
    { favoriteTours: tourId },
    { $pull: { favoriteTours: tourId } }, // removes the tourId from array
  );

  next();
});

// embedding or denormalization
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// post middleware => executed after all the pre middleware functions have completed
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// query middleware => executed before any find query is executed
// returns all the tours that are not secret
// /^find/ => any functions start with find
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  // this.start = Date.now();
  next();
});

// populate => replace user id's with the actual data or fill up the field [guides] with data without __v and passwordChangedAt
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides.user',
    select: '-__v -passwordChangedAt -confirmedEmail',
  });
  next();
});

// aggregate middleware => executed before any aggregate query is executed
// returns all the tours that are not secret, when we use aggregate (match) method
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

// models name and variables should be start with uppercase.
const Tour = mongoose.model('Tour', tourSchema); // 'Tour' is the name of the collection (table)

module.exports = Tour;
