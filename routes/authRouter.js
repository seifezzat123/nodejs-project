const express = require('express');
const {login} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login',login);
module.exports = authRouter; //was module.export istead of module.exports