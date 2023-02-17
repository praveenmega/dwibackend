const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const listingRouter = require('./routes/listingRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json()); //this middleware parse json object and put into req body 
app.use(express.static(`${__dirname}/public`)) //this middleware used to serve static files

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/listings',listingRouter);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

module.exports = app;