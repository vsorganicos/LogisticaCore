'use strict';

const config = require('../../../config.json');
const http = require('https');
const request = require('request');

module.exports.calcDirections = function(origin, destination, callback) {
  var result = {
    status: null
  };

  try {
      var url = config.google.api.maps.url + '?origins=' + origin;
      url += '&destinations=' + destination;
      url += '&mode=' + config.google.api.maps.paths.directions.mode;
      url += '&key=' + config.google.api.secretKey;

      var handling = function(body, callback) {
        var jSon = JSON.parse(body);

        if(jSon.status) {
          result.status = jSon.rows[0].elements[0].status;

          result.distance = jSon.rows[0].elements[0].distance;
          result.duration = jSon.rows[0].elements[0].duration;
        }

        callback(null, result);
      }

      request(url, function(error, response, body) {
        if(error || response.statusCode!=200)
          return callback(error, null)

        //console.log('Handling Result: ' + body);
        handling(body, callback);
      });

  }catch(e) {
    console.error('Erro na chamada do Google API: ' + e);
    callback(e, null);
  }
}

module.exports.getGeocode = function(location, callback) {
  var result = {
    status: null
  };
  try {
    var url = config.google.api.geocoding.url + '?';
    url += 'address=' + location;
    url += '&key=' + config.google.api.secretKey;

    var handling = function(body, callback) {
      var jSon = JSON.parse(body);

      if(jSon.status) {
        result.status = jSon.status;

        if(jSon.results[0]) {
          result.id = jSon.results[0].place_id;
          result.location = jSon.results[0].geometry.location;
          result.description = jSon.results[0].formatted_address;
        }
      }

      callback(null, result);
    }
    request(url, function(error, response, body) {
      if(error || response.statusCode!=200)
        return callback(error, null)

      //console.log('Handling Result: ' + body);
      handling(body, callback);
    });

  }catch(e) {
    console.error('Erro na chamada do Google Geocoding API: ' + e);
    callback(e, null);
  }
};
