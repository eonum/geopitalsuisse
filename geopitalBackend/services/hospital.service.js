// Gettign the mongoose model we just created
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the hospital list
exports.getHospitals = async function(){

    try {

        // Return the hospital list returned by the mongoose promise
        return Hospital.find();

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Hospital')
    }
};

exports.createHospital = async function(hospital){

    // Creating a new hospital object by using the new keyword
    var newHospital = new Hospital({
        name: hospital.name,
    });

    // Creating a new address object by using the new keyword
    var newAddress = new Address({
       street: hospital.street,
       streetNumber: hospital.streetNumber,
       plz: hospital.plz,
       city: hospital.city
    });

    try{

        // Saving the Hospital
        console.log("Are you working ?");
        var savedHospital = await newHospital.save() && newAddress.save();

        return savedHospital;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Hospital")
    }
};

exports.hospitalCreate = async function(name){
	var hospital = new Hospital(name);
	hospital.save(function (err){
		if(err){
			cb(err, null)
			return
		}
		console.log('New hospital:' + hospital);
	});
}

exports.updateTodo = async function(hospital){
    var id = hospital.id

    try{

        //Find the old hospital bbject by the Id
        var oldHospital = await Hospital.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false
    if(!oldHospital){
        return false;
    }

    console.log(oldHospital)

    //Edit the hospital object
    oldHospital.title = todo.title;
    oldHospital.description = todo.description;
    oldHospital.status = todo.status;

    console.log(oldHospital);

    try{
        var savedHospital = await oldHospital.save();
        return savedHospital;
    }catch(e){
        throw Error("And Error occured while updating the Hospital");
    }
};
