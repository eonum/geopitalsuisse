var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'yandex',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('29 champs elysée paris', function(err, res) {
  console.log(res);
});
