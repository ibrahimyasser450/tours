/* eslint-disable prefer-const */
const validator = require('validator');
const multer = require('multer');
const sharp = require('sharp');
const slugify = require('slugify');
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');

// store files[images] in memory to be easier to take it again in next middleware function
const multerStorage = multer.memoryStorage();
// allow only images to be uploaded not other files like pdf, txt, csv, docs
// file.mimetype => image/jpeg

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// multer allows us to upload files
// dest is the directory where the files[imaged] will be saved when uploaded
// create middleware function that we can put it on update profile route
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.validateTour = async (req, res, next) => {
  let {
    name,
    price,
    duration,
    maxGroupSize,
    difficulty,
    summary,
    description,
    startDates,
    startLocation,
  } = req.body;

  const errors = [];

  // --- Parse numbers ---
  price = price ? Number(price) : null;
  duration = duration ? Number(duration) : null;
  maxGroupSize = maxGroupSize ? Number(maxGroupSize) : null;

  // --- we need to parse it from string to array or object ---
  try {
    if (startDates) startDates = JSON.parse(startDates);
    if (startLocation) startLocation = JSON.parse(startLocation);
  } catch (err) {
    errors.push({
      field: 'json',
      message: 'Invalid JSON in startDates/startLocation',
    });
  }

  // --- Name validation ---
  if (!name || name.trim() === '') {
    errors.push({ field: 'name', message: 'Tour name is required.' });
  } else {
    const isTourExist = await Tour.findOne({ name });
    if (isTourExist) {
      errors.push({
        field: 'name',
        message: 'Tour with this name already exists.',
      });
    }
  }

  // --- Price validation ---
  if (!price || Number.isNaN(price)) {
    errors.push({ field: 'price', message: 'Valid price is required.' });
  }

  // --- Duration validation ---
  if (!duration || Number.isNaN(duration)) {
    errors.push({ field: 'duration', message: 'Valid duration is required.' });
  }

  // --- Max group size validation ---
  if (!maxGroupSize || Number.isNaN(maxGroupSize)) {
    errors.push({
      field: 'maxGroupSize',
      message: 'Valid maxGroupSize is required.',
    });
  }

  // --- Difficulty validation ---
  const allowedDifficulties = ['easy', 'medium', 'difficult'];
  if (!difficulty || !allowedDifficulties.includes(difficulty.toLowerCase())) {
    errors.push({
      field: 'difficulty',
      message: 'Difficulty must be one of: easy, medium, difficult.',
    });
  }

  // --- Summary validation ---
  if (!summary || summary.trim() === '') {
    errors.push({ field: 'summary', message: 'Summary is required.' });
  }

  // --- Description validation ---
  if (!description || description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required.' });
  }

  // --- Start Dates validation ---
  if (!startDates || !Array.isArray(startDates) || startDates.length < 3) {
    errors.push({
      field: 'startDates',
      message: 'Three start date is required.',
    });
  }

  // --- Start Location validation ---
  if (
    !startLocation ||
    !startLocation.coordinates ||
    !Array.isArray(startLocation.coordinates) ||
    startLocation.coordinates.length !== 2
  ) {
    errors.push({
      field: 'startLocation',
      message: 'Valid start location is required.',
    });
  }

  // --- Image validation (from Multer) ---
  if (!req.files || !req.files.imageCover) {
    errors.push({ field: 'imageCover', message: 'Image cover is required.' });
  }
  if (!req.files || !req.files.images || req.files.images.length < 3) {
    errors.push({ field: 'images', message: 'three images are required.' });
  }

  // --- Return errors if any ---
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// we have multiple files[images] so we need to use fields and the imageCover field is only one and the images field is an array[3 images]
// multiple files one of them have one image[imageCover] and another one have 3 images[images]
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// if we have one field with one image
// upload.single('image'); => req.file
// if we have one field with multiple images
// upload.array('images', 3); => req.files

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  let specialImage = req.params.id;
  if (!req.files || (!req.files.imageCover && !req.files.images)) return next();

  if (!req.params.id) specialImage = slugify(req.body.name, { lower: true });

  // Process cover image if provided
  if (req.files.imageCover) {
    req.body.imageCover = `tour-${specialImage}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333) // width = 2000, height = 1333 (3:2 aspect ratio)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.imageCover}`);
  }

  // Process additional images if provided
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-${specialImage}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/tours/${filename}`);
        req.body.images.push(filename);
      }),
    );
  }

  next();
});

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.checkTourName = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ name: req.params.name });

  res.status(200).json({
    status: 'success',
    exists: !!tour, // true if found, false if not
  });
});

// we need to get reviews when get single tour only
// path property is the field that we want to get
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getAllTours = factory.getAll(Tour);
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }, // the data that we want to get it to do some aggregation functions on it
      },
      {
        $group: {
          // _id: null, // to put all data in one group
          _id: { $toUpper: '$difficulty' }, // to make groups depending on difficulty
          // _id: '$ratingsAverage', // to make groups depending on ratingsAverage
          numTours: { $sum: 1 }, // to increase the number of tours by 1 for each document in each group
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, // sort 1 meaning sort ascending by avgPrice
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } } // to remove the EASY group, ne means not equal
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates', // to make each startDates a separate document if one document has 3 startDates then it will be 3 documents
      },
      {
        $match: {
          startDates: {
            // get all the startDates that are in the year that we want
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' }, // to make groups depending on month
          numTourStarts: { $sum: 1 }, // to increase the number of tours by 1 for each document in each group
          tours: { $push: '$name' }, // to push the name of the tour in each group
        },
      },
      {
        $addFields: { month: '$_id' }, // to add a field called month that is the same as the _id, 1 => january, 2 => february and so on
      },
      {
        $project: {
          _id: 0, // hide the _id field, if 1 then it will show the _id field
        },
      },
      {
        $sort: { numTourStarts: -1 }, // to sort in descending order
      },
      {
        $limit: 12, // to limit the number of documents
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        size: plan.length,
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
});

// i want to get all the tours that are within a certain radius from a certain location ex: get all the tours that are within 250miles from los angeles[34.111745,-118.113491]
// / tours-within/250/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(','); // 48.8534,2.3488

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1; // 3963.2 is the radius of the earth in miles and 6378.1 is the radius of the earth in km

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400,
      ),
    );
  }

  // geoWithin => to get all the tours that are within the radius at the location [ longitude, latitude ]
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

// /tours-distance/34.111745,-118.113491/unit/mi
// get all the distances of all the tours from a certain location [longitude, latitude]
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001; // 0.000621371 to convert meter to mile and 0.001 to convert meter to km

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400,
      ),
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1], // to convert string to number
        },
        distanceField: 'distance', // to add a field called distance that will appear in the result
        distanceMultiplier: multiplier, // to get the distance in miles or km
      },
    },
    {
      // to get only the name and the distance, project => select
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
