const catchAsync = require("../utils/catchAsync");
const Driver = require("../models/driverModel");
const Route = require("./../models/routesModel");
const AppError = require("../utils/appError");

// create driver
exports.createDriver = catchAsync(async (req, res, next) => {
  const newDriver = await Driver.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      driver: newDriver,
    },
  });
});

// get all drivers
//get all routes
exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const drivers = await Driver.find();
  res.status(200).json({
    status: "success",
    result: drivers.length,
    data: {
      drivers,
    },
  });
});
// get a specific route
exports.getDriver = catchAsync(async (req, res, next) => {
  const { driverId } = req.params;
  if (!driverId) return next(new AppError("Please provide driver id", 500));
  const driver = await Driver.findById(driverId);
  if (!driver) return next(new AppError("No dirver found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      driver,
    },
  });
});
// update a specific route
exports.updateDriver = catchAsync(async (req, res, next) => {
  const { driverId } = req.params;
  if (!driverId) return next(new AppError("Please provide driver id", 500));
  const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedDriver)
    return next(new AppError("No driver found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      updatedDriver,
    },
  });
});
// delete a specific route
exports.deleteDriver = catchAsync(async (req, res, next) => {
  const { driverId } = req.params;
  if (!driverId) return next(new AppError("Please provide id", 500));
  await Driver.findByIdAndDelete(driverId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
// history of driver
exports.getDriverHistory = catchAsync(async (req, res, next) => {
  const { driverId } = req.params;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;
  if (!driverId) return next(new AppError("Please provide driver id", 500));
  const query = Route.find({ driverId });
  const routes = await query.skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    results: routes.length,
    data: {
      routes,
    },
  });
});
