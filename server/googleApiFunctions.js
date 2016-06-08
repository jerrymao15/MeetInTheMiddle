'use strict'

const request = require('request');
const privateKeys = require('./../privateKeys.js');

let googleApiFunctions = {};

//Get coordinates for each inputted address
//Hard coded for two address right now: should be looped with a for all promise to handle
//indefinte amount of coordinate requests. See bluebird promises. The rest of the route
//can handle an indefinte amount of inputs
googleApiFunctions.getCoordinates = function(req, res, next) {
  let coordinateData = {
    latitudes: [],
    longitudes: [],
  };


  function googRequest(url) {
    return new Promise((resolve, reject) => {
      request(url, function(err, res, body) {
        resolve(JSON.parse(body));
      })
    })
  }

  const promiseArr = req.body.inputUrlArray.map(googRequest);

  Promise.all(promiseArr)
    .then(results => {
      results.forEach(datas => {
        coordinateData.latitudes.push(datas.results[0].geometry.location.lat);
        coordinateData.longitudes.push(datas.results[0].geometry.location.lng);
      })
      req.body.coordinateData = coordinateData;
      next();
    })
    .catch(err => {
      console.log('Failed promise somewhere');
      next();
    })
};

//Implementing averaging of coordinates and finding the location of the center
//Central location is sent back to the google api to get the neighborhood, which
//is needed for the yelp api query
googleApiFunctions.findCentralLocation = function(req, res, next) {
  const googleApiKey = privateKeys.googleApiKey;

  const elements = req.body.coordinateData.latitudes.length;
  const latitudeAverage = req.body.coordinateData.latitudes.reduce(function (a, b) {
    return a + b;
  }) / elements;
  const longitudeAverage = req.body.coordinateData.longitudes.reduce(function (a, b) {
    return a + b;
  }) / elements;

  req.body.averageLocation = [latitudeAverage, longitudeAverage];

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.averageLocation[0]},${req.body.averageLocation[1]}&key=${googleApiKey}`;
  request(url, function (error, response, body) {
    let data = JSON.parse(body);
    for (var i = 0; i < data.results[1].address_components.length; i++) {
      if (data.results[1].address_components[i].types.indexOf('neighborhood') !== -1) {
        req.body.city = data.results[1].address_components[i].long_name;
        continue;
      }
    }
    next();
  })
};

googleApiFunctions.findTravelTime = function(req, res, next) {
  const url1 = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=',
  start = `${req.body.yelp_coord.latitude},${req.body.yelp_coord.longitude}`, //lat and longitude
  googleApiKey = '&key='+privateKeys.googleApiKey;
  let destinations = '&destinations=';

  req.body.user_coords.forEach(coord => {
    destinations += `|${coord.latitude},${coord.longitude}`
  })
  destinations = destinations.replace('|', '');

  const finalURL = url1+start+destinations+googleApiKey;

  request(finalURL, (err, res, body) => {
    if (err) console.log(err);
    const resultArr = [];
    JSON.parse(body).rows[0].elements.forEach(yelp => {
      resultArr.push({
        distance: yelp.distance.text,
        travelTime: yelp.duration.text
      })
    })
    req.body.calculatedDistance = resultArr;
    next();
  })

}

module.exports = googleApiFunctions;
