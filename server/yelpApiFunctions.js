'use strict'

const oauthSignature = require('oauth-signature');
const n = require('nonce')();
const request = require('request');
const qs = require('querystring');
const privateKeys = require('./../privateKeys.js');

let yelpApiFunctions = {};

//function gnerates oauthsignature and query string for yelp api
//hard coded to restaurants right now
yelpApiFunctions.generateUrl = function(req, res, next) {
  const baseUrl = 'http://api.yelp.com/v2/search';
  const consumerKey = privateKeys.consumerKey, consumerSecret = privateKeys.consumerSecret;
  const token = privateKeys.token, tokenSecret = privateKeys.tokenSecret;

  let parameters = {
    cll: req.body.averageLocation[0] + ',' + req.body.averageLocation[1],
    //For sort: 0 is best match (default), 1 is distance, 2 is higest rated
    sort: '0',
  };

  const coords = `${req.body.averageLocation[0]},${req.body.averageLocation[1]}`
  let cat = '';
  //TODO impliment defaults
  if (req.body.categories) {
    req.body.categories.forEach(cata => {
      cat += ',' + cata.toLowerCase().replace(/(\s.*)/, '');
    });
    parameters.category_filter = cat.replace(',', '');
  } else {
    parameters.category_filter = 'restaurants';
  }
  parameters.ll = coords;
  parameters.oauth_consumer_key = consumerKey;
  parameters.oauth_token = token;
  parameters.oauth_nonce = n();
  parameters.oauth_timestamp = n().toString().substr(0,10);
  parameters.oauth_signature_method = 'HMAC-SHA1';
  parameters.oauth_version = '1.0';
  parameters.oauth_signature = oauthSignature.generate('GET', baseUrl, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  req.body.requestUrl = baseUrl + '?' + qs.stringify(parameters);

  next();
};

//queries yelp api for location data and slices 10 results
//TODO: Modify API query to fallback to other types of search if no results
yelpApiFunctions.queryLocationData = function(req, res, next) {
  request(req.body.requestUrl, function (error, response, body) {
    if (error) return res.status(400).send(error);
    const data = JSON.parse(body);
    const RESULTS = 2;
    req.body.businessArray = data.businesses.slice(0, RESULTS);
    next();
  })
};

module.exports = yelpApiFunctions;
