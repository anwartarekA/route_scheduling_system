const mongoose = require("mongoose");
const Driver = require("./driverModel");
const routeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Route must have a title"],
      minLength: [10, "Route must have at least 10 characters"],
      maxLength: [100, "Route must have at most 100 characters"],
      trim: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "Route must have a driver"],
    },
    startDate: {
      type: Date,
      required: [true, "Route must have a start date"],
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "Route must have an end date"],
      default: Date.now,
      validate: {
        validator: function (val) {
          return val > this.startDate;
        },
        message: "End date must be greater than start date",
      },
    },
    distance: {
      type: Number,
      required: [true, "Route must have a distance"],
      min: [0, "Distance must be at least 0"],
    },
    status: {
      type: String,
      enum: {
        values: ["planned", "in-progress", "completed", "cancelled"],
        message: "Status is either: planned, in-progress, completed, cancelled",
      },
    },
    startLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number],
      description: String,
    },
    endLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number],
      description: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
routeSchema.pre("save", async function (next) {
  const { driverId } = this;
  await Driver.findByIdAndUpdate(
    driverId,
    { availability: false },
    {
      new: true,
      runValidators: true,
    }
  );
  next();
});
const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
