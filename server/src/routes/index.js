const indexRouter = require('express').Router();

indexRouter.use('/bookings', require('./booking'));
indexRouter.use('/users', require('./user'));

module.exports = indexRouter;