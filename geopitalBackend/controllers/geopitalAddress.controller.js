var hospitalService = require('../services/geopitalAddress.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getHospitals = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    try{

        var hospitals = await hospitalService.getHospitals();
        console.log('It should go through here');
        // Return the todos list with the appropriate HTTP Status Code and Message.
        console.log(hospitals);
        return res.status(200).json({status: 200, data: hospitals, message: "Succesfully Todos Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message+"ewefef"});

    }
}
