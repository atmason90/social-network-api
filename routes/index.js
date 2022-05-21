// require express router
const router = require('express').Router();

// import all api routes
const apiRoutes = require('./api');

// use '/api' prefix for all api routes
router.use('/api', apiRoutes);

// send 'Wrong Route!' if incorrect route used
router.use((req, res) => res.send('Wrong Route!'));

// export router
module.exports = router; 