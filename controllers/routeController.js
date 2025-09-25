const Route = require("./../models/routesModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// create route
exports.createRoute = catchAsync(async (req, res, next) => {
  const newRoute = await Route.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      route: newRoute,
    },
  });
});
//get all routes
exports.getAllRoutes = catchAsync(async (req, res, next) => {
  const routes = await Route.find();
  res.status(200).json({
    status: "success",
    result: routes.length,
    data: {
      routes,
    },
  });
});
// get a specific route
exports.getRoute = catchAsync(async (req, res, next) => {
  const { routeId } = req.params;
  if (!routeId) return next(new AppError("Please provide route id", 500));
  const route = await Route.findById(routeId);
  if (!route) return next(new AppError("No route found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      route,
    },
  });
});
// update a specific route
exports.updateRoute = catchAsync(async (req, res, next) => {
  const { routeId } = req.params;
  if (!routeId) return next(new AppError("Please provide route id", 500));
  const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedRoute)
    return next(new AppError("No route found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      updatedRoute,
    },
  });
});
// delete a specific route
exports.deleteRoute = catchAsync(async (req, res, next) => {
  const { routeId } = req.params;
  if (!routeId) return next(new AppError("Please provide id", 500));
  await Route.findByIdAndDelete(routeId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

//check a driver available or not
exports.checkAvailability = catchAsync(async (req, res, next) => {
  const { driverId } = req.body;
  if (!driverId) return next(new AppError("please povide dirver id", 500));
  const route = await Route.findOne({ driverId });
  if (!route) return next();
  const currentTime = new Date().getTime();
  const routeStartTime = route.startDate.getTime();
  const routeEndTime = route.endDate.getTime();
  if (currentTime >= routeStartTime && currentTime <= routeEndTime) {
    return next(new AppError("Driver now is assigned to another route", 400));
  } else {
    route.status = "completed";
    await route.save({ validateBeforeSave: false });
    return next();
  }
});
