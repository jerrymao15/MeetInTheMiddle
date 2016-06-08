'use strict'

const privateKeys = require('./../privateKeys.js');

let dataHandler = {};

dataHandler.parseInput = function (req, res, next) {
  const googleApiKey = privateKeys.googleApiKey;
  let baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  let urlArray = [];

  for (let i = 0; i < req.body.inputArray.length; i++) {
    let url = baseUrl;
    url +=`${req.body.inputArray[i].street.trim().replace('/\s/g', '+')},${req.body.inputArray[i].city.trim().replace('/\s/g', '+')},${req.body.inputArray[i].state.trim().replace('/\s/g', '+')}`
    urlArray.push(url);
  }


  req.body.inputUrlArray = urlArray;
  next();
};

dataHandler.sendOutput = function (req, res, next) {
  const outputObject = {
    centralCoordinates: {
      latitude: req.body.averageLocation[0],
      longitude: req.body.averageLocation[1],
    },
    meetSuggestions: req.body.businessArray,
    userCoords: req.body.coordinateData
  }

  res.send(outputObject);
}

module.exports = dataHandler;
