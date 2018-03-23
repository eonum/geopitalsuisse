var hospitalService = require('../services/hospital.service');
var Hospital = require('../models/hospital.model');
var geopitalService = require('../services/geopitalAddress.service');
// Saving the context of this module inside the _the variable

_this = this;


// Async Controller function to get the hospital list
exports.getHospitals = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    try{
      Hospital.find().populate('address').exec(function (err, hospitals){
        if (err){return next(err);}
        console.log(hospitals);
        var list = hospitals;
        return res.status(200).json({status: 200, data: list, message: "Hospital Succesfully Recieved"});
      });
        //var hospitals = await hospitalService.getHospitals();
        // Return the hospital list with the appropriate HTTP Status Code and Message.


    }catch(e){

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});

    }
}
exports.createDummyHospitals = async function(req, res, next){
	var dummy = {
		year: "2015",
		name: "Insel Spital",
		street: "Freiburgstrasse",
		streetNumber: "8",
		plz:"3010",
		city:"Bern"
	}
	var hospital = hospitalService.hospitalCreate(dummy);
	return res.status(200).json({status: 200,data: hospital, message:'This should work'
	})
}

exports.getHospitalDummy = async function(req, res, next){
  console.log(req.params.id);
  try{
    const hospitals = await geopitalService.getDummyHospitals();
    const hospital = hospitals[req.params.id -1];
    delete hospital.coordinates;
    return res.status(200).json({status: 200, data: hospital, message: "Succesfully received Dummys"});
  }
  catch(e){
    return res.status(400).json({status: 400, message: e.message+" Please report the bug to your backend team"});
  }
}
exports.getAllHospitalsNoAttributes = async function(req, res, next){
  try{
    throw new Error('Not yet implemented')
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
  return res.status(400).json({status:400, message: 'Not yet implemented!'});
}
exports.Dummy_getAllHospitalsNoAttributes = async function(req, res, next){
  try{
    const hospitals = await geopitalService.getDummyHospitals();
    for(var i= 0; i < hospitals.length; i++){
      delete hospitals[i].attributes;
    }
    return res.status(200).json({status: 200, data: hospitals});
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}

exports.Dummy_getHospitalData = async function(req, res, next){
  try{
    const hospitals = await geopitalService.getDummyHospitals();
    return res.status(200).json({status: 200, data: hospitals[req.params.id]});
  }catch(e){
    return rest.status(400).json({status:400, message: e.message});
  }
}

exports.getHospitalData = async function(req, res, next){
  try{
    throw new Error('Not yet implemented');
    const hospitals = await geopitalService.getDummyHospitals();
    return res.status(200).json({status: 200, data: hospitals[req.params.id]});
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}
