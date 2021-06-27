const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    street: String,
    locality: String,
    city: String,
    pincode: String
  },
  slots: [
    {
      _id: false,
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  bookings: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Booking'
		}
  ],
  turfOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Turf = mongoose.model('Turf', turfSchema);
module.exports = Turf;