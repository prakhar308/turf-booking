const indexRouter = require('express').Router();

indexRouter.use('/bookings', require('./booking'));

module.exports = indexRouter;