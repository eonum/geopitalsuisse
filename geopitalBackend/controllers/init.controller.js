var initService = require('../services/upload.service');
var geocodingService = require('../services/geocoding.service');

exports.insertHospitals =  async function (req, res){
  initService.initJsonImport();
  await setTimeout(function () {
      res.redirect('/mvc/init/coords');
  }, 5000);
}

exports.insertCoordinates = async function (req, res){
  geocodingService.addCoordinatesToHospitals();
  await setTimeout(function () {
      res.redirect('/mvc/hospitals');
  }, 5000);
}
