const express = require('express');
const {
  createTrip,
  retrieveAllTrips,
  retrieveTripById,
} = require('../controllers/TripController.js');

const { verifyToken, verifyAdmin } = require('../controllers/authController.js'); // import it

const tripRouter = express.Router();

// All trips
tripRouter
  .route('/')
  .post(verifyAdmin, createTrip)        // Add new trip
  .get(verifyToken, retrieveAllTrips);  // Get all trips for authenticated users


tripRouter
  .route('/:id')
  .get(retrieveTripById)


module.exports = tripRouter;