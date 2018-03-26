var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
var Coordinates = require('../models/coordinates.model');
var geocoderService = require('./geocoder.service');

exports.addCoordinatesToHospitals = async function(){
  Hospital.find().populate('address').exec(function (err, hospitals){
    console.log('start');

    for(var i = 0; i < hospitals.length; i++){
      getCoordinatesFromJson(hospitals[i]);
    }
  });
}

saveCoordinates = async function(hospital){
  console.log('start');
  geocoder.geocode();
  try{
    throw error('test');
    geocoder.geocode(hospital.address.line, function(err, res){
      console.log(res);
    })
  }
  catch(e){
    console.log('Oops');
  }
}

getCoordinatesFromJson = async function(hospital){
  try{
    console.log(hospital.address.line);
    var json = await geocoderService.geocode(hospital.address.line);
    console.log(json);
    var coordinates = new Coordinates({
      _id: new mongoose.Types.ObjectId(),
      latitude: json[0].latitude + 'N',
      longitude: json[0].longitude + 'E'
    });
    hospital.coordinates = coordinates;
    var savedCoordinates = coordinates.save();
    var savedHospital = hospital.save();
  }catch(e){
    console.log(e.message);
  }
}
