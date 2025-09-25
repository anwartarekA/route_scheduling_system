const express = require("express");
const app = express();
const globalErrorHandling = require("./utils/globalErrorHandling");
const AppError = require("./utils/appError");
const routeRouter = require("./routes/routeRouter");
const driverRouter = require("./routes/driverRouter");
// read the body of request
app.use(express.json());
app.use("/api/v1/routes", routeRouter);
app.use("/api/v1/drivers", driverRouter);
// catch all routes that not exist
app.all("*", (req, res, next) => {
  next(new AppError(`server can't access this route ${req.originalUrl}`, 500));
});
app.use(globalErrorHandling);
module.exports = app;
