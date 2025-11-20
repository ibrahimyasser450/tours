// Factory functions for CRUD operations => createOne, getOne, getAll, updateOne, deleteOne to be used in other controllers by passing model as argument
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // runValidators: true will check if the data is valid like checking if price is number, name is string and rating is double
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // to do all validations in tourSchema like when create new tour
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // when create new tour use FormData to send files [imageCover, images] so before saving it we need to parse it from string to array.
    if (req.body.startDates) {
      req.body.startDates = JSON.parse(req.body.startDates);
    }
    if (req.body.startLocation && typeof req.body.startLocation === 'string') {
      req.body.startLocation = JSON.parse(req.body.startLocation);
    }
    // console.log(req.body);
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow nested GET reviews on tour
    let filter = {};
    if (req.params.userId && req.params.tourId)
      filter = { user: req.params.userId, tour: req.params.tourId };
    else if (req.params.tourId) filter = { tour: req.params.tourId };
    else if (req.params.userId) filter = { user: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
