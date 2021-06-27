const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const bookingController = require('../controllers/bookingController.js');

router.route('/')
  .all(auth)
  .post(bookingController.createBooking)
  .get(bookingController.getBookings);

module.exports = router;