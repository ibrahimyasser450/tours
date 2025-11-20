const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getSignupForm = (req, res) => {
  // console.log(req.cookies.jwt);
  // meaning user is already signed up and we don't want to show signup form  because user already have account
  if (!(req.cookies.jwt === 'loggedout' || req.cookies.jwt === undefined)) {
    return res.redirect('/');
  }
  res.status(200).render('signup', {
    title: 'Create new account',
  });
};

exports.getConfirmEmail = (req, res) => {
  res.status(200).render('confirmEmail', {
    title: 'Confirm your email address',
  });
};

exports.getLoginForm = (req, res) => {
  // meaning user is already logged in and we don't want to show login form
  // when cookies.jwt expires meaning equal undefined
  if (!(req.cookies.jwt === 'loggedout' || req.cookies.jwt === undefined)) {
    return res.redirect('/');
  }
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getProfile = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

// exports.getMyTours = catchAsync(async (req, res, next) => {
//   // 1) Find all bookings
//   const bookings = await Booking.find({ user: req.user.id });

//   // 2) Find tours with the returned IDs
//   const tourIDs = bookings.map((el) => el.tour); // return all the tour ids
//   const tours = await Tour.find({ _id: { $in: tourIDs } }); // return all the tours[data]

//   res.status(200).render('overview', {
//     title: 'My Tours',
//     tours,
//   });
// });

// if we used without api at account.pug
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({
    createdAt: 1, // sort by createdAt in ascending order
  });

  // Group bookings by tourDate and keep only the last one based on createdAt
  // acc is object take the key[tourDate] and the value[ latest booking] for each tour date
  const latestBookings = bookings.reduce((acc, booking) => {
    const dateKey = booking.tourDate.toISOString(); // Convert date to string for comparison , booking.tour.name => get one booked for tour
    acc[dateKey] = booking; // Overwrite older bookings with the latest one
    return acc;
  }, {});

  res.status(200).render('bookings', {
    title: 'All bookings',
    bookings: Object.values(latestBookings), // return array of the values from an object.
  });
});

exports.getMyFavoriteTours = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('User not found.', 404));
  const favoriteTours = await Tour.find({ _id: { $in: user.favoriteTours } });

  res.status(200).render('favoriteTours', {
    title: 'My favorite tours',
    tours: favoriteTours,
  });
});

exports.getReviewForm = async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug });
  // console.log(tour);
  res.status(200).render('createReview', {
    title: 'Create a review',
    tour,
  });
};

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });
  res.status(200).render('reviews', {
    title: 'My reviews',
    reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  console.log(review);
  res.status(200).render('updateReview', {
    title: `Review for ${review.tour.name}`,
    review,
  });
});

exports.getData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/');
  }
  let { section } = req.params;
  let data = [];
  let title = 'Dashboard';

  switch (section) {
    case 'users':
      data = await User.find();
      title = 'Manage Users';
      section = 'user';
      break;
    case 'tours':
      data = await Tour.find();
      title = 'Manage Tours';
      section = 'tour';
      break;
    case 'reviews':
      data = await Review.find();
      title = 'Manage Reviews';
      section = 'review';
      break;
    case 'bookings':
      data = await Booking.find();
      title = 'Manage Bookings';
      section = 'booking';
      break;
    default:
      return;
  }

  res.status(200).render('dashboard', {
    title,
    section,
    data,
  });
};

exports.addData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/');
  }
  const { section } = req.params;
  let title = 'Add';
  const tours = await Tour.find();
  const users = await User.find({ role: { $ne: 'admin' } });
  switch (section) {
    case 'user':
      title = 'Add User';
      break;
    case 'tour':
      title = 'Add Tour';
      break;
    case 'review':
      title = 'Add Review';
      break;
    case 'booking':
      title = 'Add Booking';
      break;
    default:
      return;
  }
  res.status(200).render('addSection', {
    title,
    section,
    tours,
    users,
  });
};

exports.viewData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/');
  }
  const { section, id } = req.params;
  let data = [];
  let title = 'View';
  switch (section) {
    case 'user':
      data = await User.findById(id).populate('favoriteTours', 'name');
      title = 'View User';
      break;
    case 'tour':
      data = await Tour.findById(id);
      title = 'View Tour';
      break;
    case 'review':
      data = await Review.findById(id);
      title = 'View Review';
      break;
    case 'booking':
      data = await Booking.findById(id);
      title = 'View Booking';
      break;
    default:
      return;
  }
  res.status(200).render('viewSection', {
    title,
    section,
    data,
  });
};

exports.updateData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/');
  }
  const { section, id } = req.params;
  let data = [];
  let title = 'Update';
  switch (section) {
    case 'user':
      data = await User.findById(id);
      title = 'Update User';
      break;
    case 'tour':
      data = await Tour.findById(id);
      title = 'Update Tour';
      break;
    case 'review':
      data = await Review.findById(id);
      title = 'Update Review';
      break;
    case 'booking':
      data = await Booking.findById(id);
      title = 'Update Booking';
      break;
    default:
      return;
  }
  res.status(200).render('updateSection', {
    title,
    section,
    data,
  });
};
