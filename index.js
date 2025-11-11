const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const TripRouter =require('./routes/TripRouter.js');//
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/UserRouter.js')



dotenv.config();
app.use(cors());

const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(express.json());
app.use('/trips', TripRouter);
app.use('/auth', authRouter); 
app.use('/user', userRouter);


module.exports= {
    app,


}

