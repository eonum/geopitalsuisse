var hospitalService = require('../services/hospital.service');

// Saving the context of this module inside the _the variable

_this = this;


// Async Controller function to get the hospital list
exports.getHospitals = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    try{

        var hospitals = await hospitalService.getHospitals();

        // Return the hospital list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: hospitals, message: "Hospital Succesfully Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});

    }
}
exports.createDummyHospitals = async function(req, res, next){
	var dummy = {
		year: "1991",
		name: "Test",
		street: "Street",
		streetNumber: "12",
		plz:"1511",
		city:"Test"
	}
	var hospital = hospitalService.hospitalCreate(dummy);
	return res.status(200).json({status: 200,data: hospital, message:'This should work'
	})
}
