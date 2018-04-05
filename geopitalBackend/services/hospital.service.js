// Gettign the mongoose model we just created
var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the hospital list
exports.getHospitals = async function(){
  console.log("DEPRECATED");
    try {
      Hospital.find().populate('address').exec(function (err, hospitals){
        if (err){return next(err);}
        console.log(hospitals);
        var list = hospitals;
      });
      return list;
        // Return the hospital list returned by the mongoose promise

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Hospital')
    }
};

exports.createHospital = async function(hospital){
console.log("DEPRECATED");
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

        var savedHospital = await newHospital.save() && newAddress.save();

        return savedHospital;
    }catch(e){

        throw Error("Error while Creating Hospital")
    }
};

exports.hospitalCreate = async function(data){
  console.log("DEPRECATED");
  var address = new Address({
    _id : new mongoose.Types.ObjectId(),
    street : data.street,
    streetNumber : data.streetNumber,
    plz: data.plz,
    city: data.city
  });
  address.save(function (err){
    if (err) return handleError(err);
    var hospital = new Hospital({
      year: data.year,
      name: data.name,
      address: address._id
    });
    hospital.save(function (err){
      if (err) return handleError(err);
    });
  });
}

exports.updateTodo = async function(hospital){
console.log("DEPRECATED");
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
