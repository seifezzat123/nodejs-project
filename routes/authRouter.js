const express = require('express');
const { signUp, login } = require('../controllers/authController');
const { validateSignup } = require('../validators');

const authRouter = express.Router();

authRouter.post('/signup',validateSignup ,signUp);

authRouter.post('/login', login);

module.exports = authRouter;