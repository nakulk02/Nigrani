const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const authRoutes=require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen('8000', (err) => {
    if (err) console.log("no connection");
});