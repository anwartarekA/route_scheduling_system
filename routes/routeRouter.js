const express = require("express");
const routeRouter = express.Router();
const {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
  checkAvailability,
} = require("./../controllers/routeController");
routeRouter.route("/").get(getAllRoutes);
routeRouter.post("/", checkAvailability, createRoute);
routeRouter
  .route("/:routeId")
  .get(getRoute)
  .patch(updateRoute)
  .delete(deleteRoute);
module.exports = routeRouter;
