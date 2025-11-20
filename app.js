const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const updateLastActive = require('./utils/updateLastActive');

const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ✅ Enable CORS for API and views (Allow both frontend and backend running on different origins)
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Frontend origins
    credentials: true, // Allow cookies and auth headers
  }),
);

// ✅ Handle preflight requests for all routes (OPTIONS requests)
app.options('*', cors());

//1) GLOBAL MIDDLEWARE

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set security HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
        'https://js.stripe.com',
      ], // Add Axios CDN source
      connectSrc: [
        // Allow API requests to the backend
        "'self'",
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://api.stripe.com',
        'ws://127.0.0.1:52254',
      ],
      frameSrc: ["'self'", 'https://js.stripe.com'],
    },
  }),
);

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from same IP, means if a user make more than 100 requests in an hour then he will get an error
// /api => that will affect all the routes that start with /api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
// if the body[data] is too large 10 kilobytes then it will give an error
app.use(express.json({ limit: '10kb' })); //middleware, it is can modify the incoming request data, it is function that is executed between in the middle of receiving the request and sending the response
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(updateLastActive()); // Every request after login automatically updates lastActiveAt and active.

// Data sanitization against NoSQL query injection
// means if the user know the password and write at email: { $gt: 0 } then it will can login so we need to sanitize it by using mongoSanitize it looks at request body, query and params and remove any $ and . signs
app.use(mongoSanitize());

// Data sanitization against XSS
// means if the user know the password and write at email: <img src="javascript:alert('xss');"> then it will can login so we need to sanitize it by using xss
app.use(xss());

// Prevent parameter pollution
// remove duplicate fields from query string or search query and do the last one if write sort=duration&sort=price then it will sort on price
// we have array [whitelist] of fields that we want to allow duplicates in the query string or search query like duration=5&duration=9
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Test middleware
app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});

// app.use(updateLastActive);

app.use('/.well-known', (req, res) => {
  return res.status(204).send(); // Do nothing for DevTools probing
});

//2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/', viewRouter);
// if the route is not found then this middleware will be executed, means if the route is not found on tourRouter or userRouter then this middleware will be executed
// when a user writes url that does not exist.
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
