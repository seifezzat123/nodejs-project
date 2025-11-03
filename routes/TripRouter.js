const express = require('express');
const {
    createTripTable,
    retrieveAllTrips,

} = require('../controllers/TripController');
const tripRouter = express.Router();

tripRouter
.route('/')
.get(retrieveAllTrips)
.post(createTripTable)


module.exports = tripRouter;

