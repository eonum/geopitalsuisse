var NodeGeocoder = require('node-geocoder');
var fs = require('fs');
/*
Yandex is used because there is no need to set a API Key
*/
var options = {
  provider: 'yandex',
  httpAdapter: 'https',
  //apiKey: fs.readFileSync('data/apiKey.secret'),
  formatter: null
};

var geocoder = NodeGeocoder(options);
/*
Takes address and returns JSON with coordinates and address
*/
exports.geocode = function(address){
  return new Promise(resolve => {
    //setTimeout(() => {
      resolve(geocoder.geocode(address));
    //}, 10);
  });
};
