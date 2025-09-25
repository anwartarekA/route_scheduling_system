const validator = require("validator");
const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
      minLength: [5, "Driver name must be at least 5 characters long"],
      maxLength: [50, "Driver name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Driver email is required"],
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Driver phone number is required"],
      trim: true,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, "Driver age is required"],
      min: [18, "Driver must be at least 18 years old"],
      max: [60, "Driver age must be less than 100 years"],
    },
    licenseNumber: {
      type: String,
      required: [true, "Driver license number is required"],
      trim: true,
    },
    vechileType: String,
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
