var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
var geocoderService = require('./geocoder.service');

exports.addCoordinatesToHospitals = async function(){
  Hospital.find().populate('address').exec(function (err, hospitals){
    console.log('start');
    getCoordinatesFromJson();
    /*
    var list = hospitals;
    for(var i = 0; i < hospitals.length; i++){
      saveCoordinates(hospitals[i]);
    }
    */
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

getCoordinatesFromJson = async function(){
  try{
    console.log('this is the jsonArray');
    var json = await geocoderService.geocode();
    console.log(json[1].longitude);
  }catch(e){
    console.log(e.message);
  }
}
