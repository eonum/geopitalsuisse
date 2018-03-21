var hospitalService = require('../services/geopitalAddress.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getHospitals = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    try{

        var hospitals = await hospitalService.getHospitals();
        // Return the hospitals list with the appropriate HTTP Status Code and Message.
        console.log(hospitals);
        return res.status(200).json({status: 200, data: hospitals, message: "Succesfully Todos Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message+"ewefef"});

    }
}

exports.getDummyHospitals = async function(req, res, next){
  try{
    const hospitals = await hospitalService.getDummyHospitals();
    for(var i = 0; i < hospitals.length; i++){
      delete hospitals[i].address;
    }
    return res.status(200).json({status: 200, data: hospitals, message: "Succesfully received Dummys"});
  }
  catch(e){
    return res.status(400).json({status: 400, message: e.message+"Please repport the bug to your backend team"});
  }
}
