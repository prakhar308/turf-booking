const express = require('express');
const router = express.Router();
const turfController = require('../controllers/turfController.js');

router.route('/')
  .post(turfController.createTurf)
  .get(turfController.getTurfs);

module.exports = router;