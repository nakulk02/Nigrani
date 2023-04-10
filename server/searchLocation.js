const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT=require('./verifyJWT');
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "login"
});
con.connect(function (err) {
    if (err) {
        console.log("no sql");
        throw err;
    }
    console.log("Connected!");
});
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/searching/:search', function (req, res) {
    console.log("reached");
    const searched = req.params.search.toLowerCase();
    con.query('SELECT * FROM locations WHERE state=(?)', [searched], function (err, result) {
        if (err) console.log(err);
        res.send(result);
    })
});

app.post(verifyJWT,'/login/:user', function (req, res) {
    const person = JSON.parse(req.params.user);
    let user = {};
    con.query('SELECT * FROM persons WHERE username=? and password=?', [person['username'], person['password']], function (err, result) {
        if (err) { console.log(err); res.sendStatus(401) };
        console.log(result);
        // res.send(result);
        user = result;
    })
    const accessToken = jwt.sign(
        { 'username': person['username'] },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' });
    res.json({user,accessToken});
});

app.listen('8080', (err) => {
    if (err) console.log("no connection");
});