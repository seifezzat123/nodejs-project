const db_access = require('../db.js');
const db= db_access.db;
 

const createTripTable = (req, res) => {
  const {
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost = 0,
    accommodationCost = 0,
    mealCost = 0,
    visaCost,
    transportationCost = 0,
    currencyCode = 'N/A',
  } = req.body;
 
  if (
    !destinationName ||
    !location ||
    !continent ||
    !language ||
    !description
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide all required fields.',
    });
  }
 
  const query = `INSERT INTO TRIP (
  DESTINATIONNAME, LOCATION, CONTINENT, LANGUAGE, 
  DESCRIPTION, FLIGHTCOST, ACCOMMODATIONCOST, MEALCOST, VISACOST, TRANSPORTATIONCOST, CURRENCYCODE
  ) 
  VALUES ('${destinationName}','${location}','${continent}','${language}','${description}',
  '${flightCost}','${accommodationCost}','${mealCost}','${visaCost}','${transportationCost}','${currencyCode}')`;

  db.run(query, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Database error',
        error : err.message
      });
    }
    return res.status(201).json({
      message:'trip created successfully'
    });

  });

}
// Retrieve all trips
const retrieveAllTrips = (req, res) => {
  db.all('SELECT * FROM TRIP', (err, rows) =>
   {
    if (err) {
      console.log(err);
      return res.status(500),json({message : 'error retrieving trips'});

    }
    res.status(200).json({message : 'Trips retrieved successfully', data: rows});
  })
}; 




  /*const newTrip = {
    id: trips.length + 1,
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost: flightCost || 0,
    accommodationCost: accommodationCost || 0,
    mealCost: mealCost || 0,
    visaCost: visaCost || 0,
    transportationCost: transportationCost || 0,
    currencyCode: currencyCode || 'N/A',
    dailyCost:
      (flightCost || 0) +
      (accommodationCost || 0) +
      (mealCost || 0) +
      (visaCost || 0) +
      (transportationCost || 0),
  };
 
  trips.push(newTrip);
 
  res.status(201).json({
    status: 'success',
    message: 'Trip created successfully',
    data: newTrip,
  });*/


module.exports = {
  createTripTable,
  retrieveAllTrips,
};