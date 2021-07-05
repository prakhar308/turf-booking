const db = require('../models');
const bookingHelper = require('../helpers/bookingHelper.js');

exports.createBooking = async (req, res) => {
  try {
    const { startTime, endTime, turf } = req.body;
    // check if booking already exists
    const existingBooking = await db.Booking.find({
      $and: [
        { turf },
        { $or: [{ startTime }, { endTime }] }
      ]
    });
    if (existingBooking.length > 0) {
      return res.status(409).send({ message: 'Cannot create booking. Slot is already booked.' });
    }

    const newBooking = req.body;
    newBooking.user = req.user.id;
    const booking = new db.Booking(newBooking);
    await booking.save();

    res.status(201).send(booking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getBookings = async (req, res) => {
  try {
    const bookings = await db.Booking.find().populate('turf', 'name').exec();
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send({ message: 'Cannot find bookings' });
  }
}

exports.updateBooking = async (req, res) => {
  try {
    let canUpdate = false;
    const updates = Object.keys(req.body);

    // Check if the user is admin and the booking he is trying to update is from his own turf
    if (req.user.isAdmin && req.body.turf === req.user.turfOwned) {
      canUpdate = true;
    } else if (req.body.user === req.user.id && bookingHelper.isValidUpdate()) {
      // If the user is not admin then check whether he is trying to update his own booking
      // and he cannot update bookingStatus or price. Only admin can update them.
      canUpdate = true;
    }

    if (canUpdate) {
      const booking = await db.Booking.findById(req.params.id);
      updates.forEach(update => booking[update] = req.body[update]);
      await booking.save();

      res.status(200).send();
    } else {
      res.status(403).send({ message: 'You are not authorized to update the booking.' })
    }
  } catch (err) {
    res.status(500).send({ message: 'Cannot update booking.' })
  }
}