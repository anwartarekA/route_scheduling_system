const express = require("express");
const driverRouter = express.Router();
const {
  createDriver,
  getAllDrivers,
  deleteDriver,
  getDriver,
  updateDriver,
  getDriverHistory,
} = require("./../controllers/driverController");
driverRouter.route("/").get(getAllDrivers).post(createDriver);
driverRouter
  .route("/:driverId")
  .get(getDriver)
  .patch(updateDriver)
  .delete(deleteDriver);
driverRouter.get("/:driverId/history", getDriverHistory);
module.exports = driverRouter;
