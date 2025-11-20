/* eslint-disable prefer-const */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createNewDate = (date) => {
  let originalDate = new Date(date); // 2023-01-01T00:00:00.000Z as date type because guides.dates is array of date type
  let currentDate = new Date(); // Current date
  let currentYear = new Date().getFullYear(); // 2025
  // const updatedDate = originalDate.toISOString();  // as string type

  if (
    currentDate.getMonth() > originalDate.getMonth() ||
    (currentDate.getMonth() === originalDate.getMonth() &&
      currentDate.getDate() > originalDate.getDate())
  ) {
    currentYear += 1; // Move to next year
  }

  originalDate.setFullYear(currentYear);
  return originalDate;
};

// it should be before open the tour page to clear the past dates to make sure the user can book the same date on next year but if use this middleware when do booking don't work because index.js will print There are no tickets available. Sold Out! because i am trying to clear past dates after booking step so it should be when open the tour page
exports.updateBooked = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findOne({ slug: req.params.slug });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  const currentDate = new Date();

  // 2) Loop through each guide and remove dates that are less than the current date[past dates]
  tour.guides.forEach((guide) => {
    guide.bookings = guide.bookings.filter((booking) => {
      // Extract month and day (ignore year) because different years in[guide.bookings.date] and [tour.startDates]
      // getMonth() returns a value between 0 (January) and 11 (December).
      const guideMonthDay = `${booking.date.getMonth() + 1}-${booking.date.getDate()}`;

      if (booking.date < currentDate) {
        // Find corresponding start date in tour.startDates
        const startDateEntry = tour.startDates.find((d) => {
          const startDate = new Date(d.date); // d.date is string type so convert it to date to use date methods
          const startMonthDay = `${startDate.getMonth() + 1}-${startDate.getDate()}`;
          return startMonthDay === guideMonthDay;
        });

        // used Math.max to make sure bookedPersons is not negative
        startDateEntry.bookedPersons = Math.max(
          0,
          startDateEntry.bookedPersons - booking.bookedPersons,
        );

        // if sold out true in database, make it false because we decrease the number of booked persons
        if (
          startDateEntry.soldOut &&
          startDateEntry.bookedPersons < tour.maxGroupSize
        ) {
          startDateEntry.soldOut = false;
        }

        return false; // Remove this date from the array not stored guide.dates array because it filters out
      }

      return true; // Keep this date because it's less than the current date[not past] and not filter out it
    });
  });

  await tour.save();
  next();
});

exports.checkBooking = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  let bookingUserId;
  if (req.params.userId) {
    // Admin is booking for a special user
    bookingUserId = req.params.userId;
  } else {
    // Normal user booking for themselves
    bookingUserId = req.user.id;
  }
  const currentUser = await User.findById(bookingUserId);

  const guideEntry = tour.guides.find((g) =>
    g.user._id.equals(currentUser._id),
  );

  const newDate = createNewDate(req.params.date); // 2025-01-01T00:00:00.000Z as date type

  // get guide[user] and check if he has same date
  if (guideEntry) {
    if (guideEntry.bookings.some((b) => b.date.getTime() === newDate.getTime()))
      if (req.params.userId) {
        return next(
          new AppError(
            `${currentUser.name} has already booked this tour on ${newDate.toLocaleString('en-us', { day: 'numeric', month: 'long' })}`,
            400,
          ),
        );
      } else {
        return next(
          new AppError(
            `You have already booked this tour on ${newDate.toLocaleString('en-us', { day: 'numeric', month: 'long' })}`,
            400,
          ),
        );
      }
  }

  req.params.price = Number(req.params.price);
  next();
});

exports.getCheckoutSession = async (req, res) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  let imageUrl =
    'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg';
  if (process.env.NODE_ENV === 'production')
    imageUrl = `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`;

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // for credit card
    mode: 'payment',
    // credit card has been successfully charged[paid] and the purchase is successful and the user is redirected to success page[this link]
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${req.params.price}&date=${req.params.date}`,
    // the user is redirected to cancel page[this link] if he cancels the payment
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    // information about the tour that the user wants to book it
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [imageUrl],
          },
          unit_amount: req.params.price * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.getCheckoutSessionForAdmin = async (req, res) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  const specialUser = await User.findById(req.params.userId);
  if (!specialUser) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }

  let imageUrl =
    'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg';
  if (process.env.NODE_ENV === 'production')
    imageUrl = `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`;

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // for credit card
    mode: 'payment',
    // credit card has been successfully charged[paid] and the purchase is successful and the user is redirected to success page[this link]
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${specialUser.id}&price=${req.params.price}&date=${req.params.date}&admin=true`,
    // the user is redirected to cancel page[this link] if he cancels the payment
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: specialUser.email,
    client_reference_id: req.params.tourId,
    // information about the tour that the user wants to book it
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [imageUrl],
          },
          unit_amount: req.params.price * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createBookingCheckout = async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  // tour is meaning tour id and user also meaning user id
  const { tour, user, price, date, admin } = req.query;
  if (!tour || !user || !price || !date) return next();
  const getTour = await Tour.findById(tour);

  const startDateEntry = getTour.startDates.find((d) => d.date === date);

  const numbersOfPeople = Number(price / getTour.price);

  // Update booked persons count
  startDateEntry.bookedPersons += numbersOfPeople;

  // Check if it's now sold out
  if (startDateEntry.bookedPersons >= getTour.maxGroupSize) {
    startDateEntry.soldOut = true;
  }

  const tourDate = createNewDate(date); // 2025-01-01T00:00:00.000Z as date type

  // Check if the user already exists in guides
  const guideEntry = getTour.guides.find((g) => g.user.id === user);

  // console.log(guideEntry);

  if (guideEntry) {
    // If user exists, push the new date to their existing dates array (if not already present)
    // if (!guideEntry.bookings.some((b) => b.date === tourDate)) // i checked before on Is booked same date before?
    guideEntry.bookings.push({
      date: tourDate,
      bookedPersons: numbersOfPeople,
    });
  } else {
    // Add new user entry with bookings
    getTour.guides.push({
      user,
      bookings: [{ date: tourDate, bookedPersons: numbersOfPeople }],
    });
  }

  await getTour.save();
  await Booking.create({ tour, user, price, numbersOfPeople, tourDate });

  if (admin === 'true') {
    return res.redirect('/dashboard/bookings');
  }

  res.redirect('/my-bookings');
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
