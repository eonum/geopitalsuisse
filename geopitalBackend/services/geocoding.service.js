var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');

exports.addCoordinatesToHospitals = async function(){
  Hospital.find().populate('address').exec(function (err, hospitals){
    var list = hospitals;
    for(var i = 0; i < hospitals.length; i++){
      saveCoordinates(hospitals[i]);
    }
  });
}

saveCoordinates = async function(hospital){
  try{
    geocoder.geocode(hospital.address.line, function(err, res){
      console.log(res);
    })
  }
  catch(e){
    console.log('Oops');
  }
}
