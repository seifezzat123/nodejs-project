const express = require('express');
const {
    createTrip,
    retrieveAllTrips,

} = require('../controllers/TripController');
const tripRouter = express.Router();

tripRouter
.route('/')
.get(retrieveAllTrips)
.post(createTrip)


module.exports = tripRouter;

