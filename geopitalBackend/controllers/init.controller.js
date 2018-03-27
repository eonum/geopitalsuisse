var uploadService = require('../services/upload.service');
var geocodingService = require('../services/geocoding.service');
var attributeService = require('../services/attribute.service');

exports.insertAttributeTypes = async function(req, res){
  attributeService.importAttributeType();
  await setTimeout(function () {
      res.redirect('/mvc/init/hospitals');
  }, 5000);
}

exports.insertHospitals =  async function (req, res){
  uploadService.initJsonImport();
  await setTimeout(function () {
    res.redirect('mvc/init/coords');
      //res.redirect('/mvc/init/coords');
  }, 5000);
}

exports.insertCoordinates = async function (req, res){
  geocodingService.addCoordinatesToHospitals();
  await setTimeout(function () {
      res.redirect('/mvc/hospitals');
  }, 5000);
}
