const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// destination and rewrite filename like user-123-232435.jpg to be unique
// file => req.file, cb => callback function , null => no error , file.mimetype => image/jpeg
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

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

// single means only one file[image] will be uploaded
// we have one field with one image
exports.uploadUserPhoto = upload.single('photo');

// resize image to be square like 500x500 to make sure it will be good when put it in circle on profile page
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // rewrite filename because we using it in update profile function
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`; // add unique id to the filename

  // get the file that stored in memory and resize it and make the quality 90%
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateProfile = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // when we use multer or need to upload files we need to use req.file because req.body not able to get the file
  //when need to upload files we should use form-data not raw at postman, because raw not able to upload files
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword.',
        400,
      ),
    );
  }
  // we need to keep only name and email, the user not allowed to change role or token or expire date for token
  const filteredBody = filterObj(req.body, 'name', 'email');
  // append photo to filteredBody if use req.file through using form-data
  if (req.file) filteredBody.photo = req.file.filename;
  // new: true means return the updated document in new object
  // runValidators: true means run validations on all fields
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// we effectively not deleting them from the database, we are only marking them as inactive
// this delete for the user logged in
exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    accountActive: false,
    active: false,
  });

  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.checkEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  res.status(200).json({
    status: 'success',
    exists: !!user, // true if found, false if not
  });
});

exports.favoriteTour = catchAsync(async (req, res, next) => {
  // add to favoriteTours array
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('User not found.', 404));
  const tour = await Tour.findById(req.body.tourId);
  if (!tour) return next(new AppError('Tour not found.', 404));

  let action;
  if (user.favoriteTours.some((id) => id.equals(tour._id))) {
    user.favoriteTours.remove(tour._id);
    action = 'removed';
  } else {
    user.favoriteTours.push(tour._id);
    action = 'added';
  }

  await User.findByIdAndUpdate(req.user.id, {
    favoriteTours: user.favoriteTours,
  });
  res.status(200).json({
    status: 'success',
    action,
    favoriteCount: user.favoriteTours.length,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// this update user for admin
// Don't update password with this because pre save middleware doesn't work or run that is used to hash password and it's already handled in update Password
exports.updateUser = factory.updateOne(User);
// this delete user for admin
exports.deleteUser = factory.deleteOne(User);
