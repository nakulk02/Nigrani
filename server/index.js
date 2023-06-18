const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser  
//const urlencodedParser = bodyParser.urlencoded({ extended: true })  

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  console.log('********************************************************************')
  //   console.log(req);
  //work
  res.status(200).json({ "query": "sdf", "sdlfk": "weri" });
});


app.post('/', async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  console.log('********************************************************************')
  //console.log(req);


  // ************* //

  const data = JSON.stringify({
    "collection": "gprsLocs",
    "database": "majorProject",
    "dataSource": "majorProjectCred",
    "document": {
      "location": JSON.stringify(req.body)
    }
  });

  const config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-plkri/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'PS7FJTxH29XfGSO2F9Q8eEdXQx6OEwZ5jl5dJZQQE92TI2HXMm4gyktbl2kPym4U',
    },
    data: data
  };



  ////......

  // const data = JSON.stringify({
  //   "collection": "loca",
  //   "database": "majorProject",
  //   "dataSource": "majorProjectCred",
  //   "filter":{"city":req.body},
  //   "document": {
  //     "location": JSON.stringify(req.body)
  //   }
  // });

  // const config = {
  //   method: 'post',
  //   url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-plkri/endpoint/data/v1/action/udateOne',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Request-Headers': '*',
  //     'api-key': 'PS7FJTxH29XfGSO2F9Q8eEdXQx6OEwZ5jl5dJZQQE92TI2HXMm4gyktbl2kPym4U',
  //   },
  //   data: data
  // };

  ///.......

  await axios(config)
    .then(function (response) {
      console.log("Location sent!! Done!!!!");
    })
    .catch(function (error) {
      console.log(error);
    });

  res.status(200);

  // ************* //

});

app.post('/alert', async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  console.log('********************************************************************')

  // ************* //

  const data = JSON.stringify({
    "collection": "alerts",
    "database": "majorProject",
    "dataSource": "majorProjectCred",
    "document": {
      "type": JSON.stringify(req.body)
    }
  });

  const config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-plkri/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'PS7FJTxH29XfGSO2F9Q8eEdXQx6OEwZ5jl5dJZQQE92TI2HXMm4gyktbl2kPym4U',
    },
    data: data
  };

  await axios(config)
    .then(function (response) {
      console.log("Alert sent!! Done!!!!");
    })
    .catch(function (error) {
      console.log(error);
    });

  res.status(200);

  // ************* //

});

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

app.listen('8001', (err) => {
  if (err) console.log("no connection");
});