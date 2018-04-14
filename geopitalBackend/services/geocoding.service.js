var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
var Coordinates = require('../models/coordinates.model');
var geocoderService = require('./geocoder.service');

/*
Takes all hospitals from the db and geocodes their addresses.
*/
exports.addCoordinatesToHospitals = async function(){
  Hospital.find().populate('address').exec(function (err, hospitals){
    for(var i = 0; i < hospitals.length; i++){
      getCoordinatesAndSave(hospitals[i]);
    }
  });
}
/*
GeoCodes a single hospital address with a geocoder and adds the coordinates to
the hospital model. This only works in Europe at the moment.
*/
exports.getCoordinatesAndSave = async function(hospital, address){
  try{
    var json = await geocoderService.geocode(address.line);
    var coordinates = new Coordinates({
      _id: new mongoose.Types.ObjectId(),
      latitude: json[0].latitude,
      longitude: json[0].longitude
    });
    hospital.coordinates = coordinates;
    var savedCoordinates = coordinates.save();
    var savedHospital = hospital.save();
  }catch(e){
    console.log('hospital: ' + hospital.name + ', address: ' + address.line + '. Error message: ' + e.message);
    return hospital;
  }
}
