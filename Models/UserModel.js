const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  checkIn: {
    type: Date,
    // default: Date.now(),
  },
  checkOut: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userModel);
