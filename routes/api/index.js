// require express router
const router = require('express').Router();

// import routes
const usersRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');

// specify endpoints
router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;