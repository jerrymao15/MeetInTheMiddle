'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const oauthSignature = require('oauth-signature');
const n = require('nonce')();
const qs = require('querystring');
const dataHandler = require('./dataHandler');
const googleApiFunctions = require('./googleApiFunctions');
const yelpApiFunctions = require('./yelpApiFunctions');
const databaseOps = require('./../db/database');
const cors = require('cors');

let app = express();

app.use(express.static(__dirname + './../client/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./index.html'));
});

//post route with middleware for meetup requests
//route should be consolidated with helper functions
app.post('/addAddress', databaseOps.createAddress, (req, res) => {
	if (req.body.databaseResponse.hasOwnProperty('errors')) return res.status(404).end();
	res.send(req.body.databaseResponse);
})

app.post('/meet', dataHandler.parseInput, googleApiFunctions.getCoordinates,
    googleApiFunctions.findCentralLocation, yelpApiFunctions.generateUrl,
    yelpApiFunctions.queryLocationData, dataHandler.sendOutput);

app.post('/createuser', databaseOps.createUser, (req, res) => {
	if (req.body.databaseResponse.hasOwnProperty('errors')) return res.status(404).end();
	res.send(req.body.databaseResponse);
});

app.post('/login', databaseOps.verifyUser, (req, res) => {
  if (req.body.databaseResponse) return res.status(404).send(req.body.databaseResponse);
  return res.status(200).end();
})

app.post('/distance', googleApiFunctions.findTravelTime, (req, res) => {
  return res.send(req.body.calculatedDistance);
})

app.listen(3000);

module.exports = app;
