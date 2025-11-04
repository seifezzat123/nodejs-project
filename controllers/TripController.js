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



module.exports = {
  createTripTable,
  retrieveAllTrips,
};