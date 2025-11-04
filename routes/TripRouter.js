const express = require('express');
const {
    createTripTable,
    retrieveAllTrips,

} = require('../controllers/TripController');
const { verifyToken } = require('../controllers/authController');
const tripRouter = express.Router();

tripRouter.use(verifyToken)
.route('/')
.get(retrieveAllTrips)
.post(createTripTable)


module.exports = tripRouter;

