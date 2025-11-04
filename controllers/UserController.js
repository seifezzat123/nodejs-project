const db_access = require('../db.js');
const db = db_access.db;
const bcrypt = require('bcrypt');

// Create a new user
const createUser = (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide username, email, and password.',
    });
  }

  // check if user already exists
  const checkQuery = `SELECT * FROM USER WHERE EMAIL='${email}'`;
  db.get(checkQuery, (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Database error',
        error: err.message,
      });
    }

    if (row) {
      return res.status(409).json({
        message: 'User already exists with this email.',
      });
    }

    // hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Error hashing password',
          error: err.message,
        });
      }

      const insertQuery = `INSERT INTO USER (USERNAME, EMAIL, PASSWORD, ROLE)
                           VALUES ('${username}', '${email}', '${hashedPassword}', '${role}')`;

      db.run(insertQuery, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Database error',
            error: err.message,
          });
        }

        // this.lastID available if you need new user id
        return res.status(201).json({
          message: 'User created successfully',
        });
      });
    });
  });
};

// Retrieve all users
const retrieveAllUsers = (req, res) => {
  db.all('SELECT ID, USERNAME, EMAIL, ROLE FROM USER', (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Error retrieving users',
        error: err.message,
      });
    }

    return res.status(200).json({
      message: 'Users retrieved successfully',
      data: rows,
    });
  });
};

module.exports = {
  createUser,
  retrieveAllUsers,
};
