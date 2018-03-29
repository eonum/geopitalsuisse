var NodeGeocoder = require('node-geocoder');
/*
Yandex is used because there is no need to set a API Key
*/
var options = {
  provider: 'yandex',
  httpAdapter: 'https',
  formatter: null
};

var geocoder = NodeGeocoder(options);
/*
Takes address and returns JSON with coordinates and address
*/
exports.geocode = function(address){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(geocoder.geocode(address));
    }, 2000);
  });
};
