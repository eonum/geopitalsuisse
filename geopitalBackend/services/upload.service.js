// Getting the mongoose model we just created
var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
const del = require('del');
var fs = require('fs');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the hospital list
exports.uploadsDelete = function(){
    del('uploads/*');
};

exports.storeJsonImport = function(){
    var obj = JSON.parse(fs.readFileSync('uploads/hospitalData.json', 'utf8'));

    obj.forEach(function(hosp){
        hospitalCreate(hosp);
    })
};

hospitalCreate = async function(data) {
    //Hospital.collection.drop();
    //Address.collection.drop();

    console.log(data.Adr.split(' ')[0]);

    var address = new Address({
        _id: new mongoose.Types.ObjectId(),
        street: data.Adr.split(' ')[0],
        streetNumber: data.Adr.split(' ')[1],
        plz: data.Ort.split(' ')[0],
        city: data.Ort.split(' ')[1]
    });

    var hospital = new Hospital({
        year: data.year,
        name: data.Inst,
        address: address._id
    });

    try{
        var savedAddress = await address.save();
        var savedHospital = await hospital.save();
        return savedAddress, savedHospital;
    }catch(e){
        throw Error("Error: "+ e +". And Error occured while importing xlsx-File");
    }
}



