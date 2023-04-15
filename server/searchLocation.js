const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const authRoutes=require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
// const mysql = require('mysql2');
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: process.env.SQL_PASSWORD,
//     database: "login"
// });
// con.connect(function (err) {
//     if (err) {
//         console.log("no sql");
//         throw err;
//     }
//     console.log("Connected!");
// });
const corsOptions = {
    origin: 'http://localhost:3001',
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