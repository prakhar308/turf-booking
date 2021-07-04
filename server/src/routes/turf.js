const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const turfController = require('../controllers/turfController.js');

router.route('/')
  .post(auth, turfController.createTurf)
  .get(turfController.getTurfs);

router.route('/:id')
  .get(turfController.getTurf);

module.exports = router;