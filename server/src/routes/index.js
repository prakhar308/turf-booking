const indexRouter = require('express').Router();

indexRouter.use('/turfs', require('./turf'));
indexRouter.use('/bookings', require('./booking'));
indexRouter.use('/users', require('./user'));

module.exports = indexRouter;