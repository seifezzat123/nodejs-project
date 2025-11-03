const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const TripRouter =require('./routes/TripRouter');//
const authRouter = require('./routes/authRouter');

dotenv.config();
app.use(cors());

app.use(express.json());
app.use('/api/v1/trips', TripRouter);
app.use('auth', authRouter);
// app.use('/api/v1/user', UserRouter);

module.exports= {app}

