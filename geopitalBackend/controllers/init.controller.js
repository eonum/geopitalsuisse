var initService = require('../services/upload.service');
var geocodingService = require('../services/geocoding.service');

exports.insertHospitals = function (req, res){
  initService.storeJsonImport('./data/hospital15.json');
  res.redirect('/mvc/hospitals');
}

exports.insertCoordinates = function (req, res){
  geocodingService.addCoordinatesToHospitals();
  res.redirect('/mvc/coordinates');
}
