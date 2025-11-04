const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db.js');

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


const signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role =  'user';

  if (!email || !password) {
    return res.status(400).send('Please provide email and password.');
  }

  console.log("Signup attempt:", email);

  // check existing user
  const checkQuery = `SELECT * FROM USER WHERE EMAIL='${email}'`;
  db.get(checkQuery, (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (row) {
      return res.status(409).send('User already exists.');
    }

    // hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error hashing password.');
      }

      const insertQuery = `INSERT INTO USER (EMAIL, PASSWORD, ROLE) VALUES ('${email}', '${hashedPassword}', '${role}')`;
      db.run(insertQuery, function (err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Error creating user.');
        }

        const newUserId = this.lastID;
        const token = signToken(newUserId, role);

        return res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: newUserId,
            email,
            role
          }
        });
      });
    });
  });
};


const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send('Please provide email and password.');
    }

    console.log("Login attempt:", email, password);
    const query = `SELECT * FROM USER WHERE EMAIL='${email}'`;

    db.get(query, (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }

        // Compare the hashed password
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error verifying password.');
            }

            if (!isMatch) {
                return res.status(401).send('Invalid credentials.');
            }

            // Generate JWT token for successful login
            const token = signToken(row.ID, row.ROLE);
            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: row.ID,
                    email: row.EMAIL,
                    role: row.ROLE
                }
            });
        });
    });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('Access denied: Token missing or malformed');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid or expired token');
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
};

module.exports = { login,
    signup,
    verifyToken,
 };