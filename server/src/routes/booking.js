const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.route('/')
  .get(bookingController.getBookings);

module.exports = router;