const express = require('express');
const {
    createUser,
    retrieveUser,


} = require('../controllers/UserController');
const userRouter = express.Router();

userRouter
.route('/')
.post(createUser)
.get(retrieveUser);



module.exports = {userRouter,

};

