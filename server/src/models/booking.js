const mongoose = require('mongoose');
const validator = require("validator");

const bookingSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bookingStatus: {
    type: String,
    default: 'Pending',
  },
  turf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turf'
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;