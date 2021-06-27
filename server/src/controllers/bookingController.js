const db = require("../models");

exports.createBooking = async (req, res) => {
  try {
    const newBooking = req.body;
    newBooking.user = {
      id: req.user._id,
      name: req.user.name
    }
    const booking = new db.Booking(newBooking);
    await booking.save();

    // add booking in user and turf bookings
    req.user.bookings.push(booking.id);
    await req.user.save(); 

    const turf = await db.Turf.findById(booking.turf);
    turf.bookings.push(booking.id);
    await turf.save();
    
    res.status(201).send(booking);
  } catch (err) {
    res.status(500).send({message : err.message});
  }
}

exports.getBookings = async (req, res) => {
  try {
    await req.user.populate('bookings').execPopulate();
    res.status(200).send(req.user.bookings);
  }
  catch (err) {
    res.status(500).send({ message: "Cannot find bookings" });
  }
}