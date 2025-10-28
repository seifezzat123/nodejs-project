const express = require('express');
const {
    createUser,
    retrieveUser,
    retrieveUserById,
    updateUserById,
    deleteUserById

} = require('../controllers/UserController');
const userRouter = express.Router();

userRouter
.route('/')
.post(createUser)
.get(retrieveUser);

tripRouter
.route('/:id')
.get(retrieveUserById)
.put(updateUserById)
.delete(deleteUserById);

module.exports = tripRouter;

