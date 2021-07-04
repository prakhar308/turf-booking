const db = require("../models");

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
      return res.status(409).send({ message: "Cannot create booking. Slot is already booked." });
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
    res.status(500).send({ message: "Cannot find bookings" });
  }
}