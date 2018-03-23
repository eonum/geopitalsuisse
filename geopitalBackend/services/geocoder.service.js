var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'yandex',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

exports.geocode = function(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(geocoder.geocode('Freiburgstrasse 8, 3010 Bern'));
    }, 2000);
  });
  /*
  return new Promise(jsonArray => {
    geocoder.geocode('Freiburgstrasse 8, 3010 Bern', function(err, res){
  })
  });
  /*
  console.log('start');
  geocoder.geocode('Freiburgstrasse 8, 3010 Bern', function(err, res){
  console.log(res);
  return res;
});
*/
};
