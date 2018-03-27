// Getting the mongoose model we just created
var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
var AttributeTypes = require('../models/attributeType.model');
var Attribute = require('../models/attribute.model');
const del = require('del');
var fs = require('fs');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the hospital list
exports.uploadsDelete = function(){
    del('uploads/*');
};

exports.storeJsonImport = function(){
    var obj = JSON.parse(fs.readFileSync('./data/hospital15.json', 'utf8'));

    obj.forEach(function(hosp){
        hospitalCreate(hosp);
    })
};

exports.initJsonImport = function(){
  var obj = JSON.parse(fs.readFileSync('./data/hospital15.json', 'utf8'));
  try{
    AttributeTypes.find().exec(function(err, types){
        console.log(types);
        console.log(obj);
        obj.forEach(function(hosp){
            hospitalCreateWithAttributes(hosp, types);
        })

    });
  }catch(e){
    console.log(e.message);
  }

};

hospitalCreateWithAttributes = async function(data, types) {
    //create new address and fill with data
    var address = new Address({
        _id: new mongoose.Types.ObjectId(),
        street: extractStreet(data.Adr),
        streetNumber: extractStreetNumber(data.Adr),
        plz: data.Ort.split(' ')[0],
        city: extractCity(data.Ort)
    });
    //create new hospital and fill with data
    var hospital = new Hospital({
        year: data.year,
        name: data.Inst,
        address: address._id
    });
    types.forEach(async function(attributeType){
      var code = attributeType.Code;
      var attribute = new Attribute({
        attributeType: attributeType,
        value: 1
      });
      hospital.attributes.push(attribute);
      var savedAttribute = await attribute.save();
    })
    //save address and hospital in db
    try{
        //do not save a hospital wthout a name -> avoid to save empty hospitals and addresses
        if(hospital.name != '') {
            var savedAddress = await address.save();
            var savedHospital = await hospital.save();
            return savedHospital;
        }
    }catch(e){
        throw Error("Error: "+ e +". And Error occured while importing xlsx-File");
    }
}


hospitalCreate = async function(data) {
    //create new address and fill with data
    var address = new Address({
        _id: new mongoose.Types.ObjectId(),
        street: extractStreet(data.Adr),
        streetNumber: extractStreetNumber(data.Adr),
        plz: data.Ort.split(' ')[0],
        city: extractCity(data.Ort)
    });
    //create new hospital and fill with data
    var hospital = new Hospital({
        year: data.year,
        name: data.Inst,
        address: address._id
    });

    //save address and hospital in db
    try{
        //do not save a hospital wthout a name -> avoid to save empty hospitals and addresses
        if(hospital.name != '') {
            console.log(hospital);
            var savedAddress = await address.save();
            var savedHospital = await hospital.save();
            return savedHospital;
        }
    }catch(e){
        throw Error("Error: "+ e +". And Error occured while importing xlsx-File");
    }
}

//extract street out of the object Adr. Split string by blanks and only use parts which do not contain a number
//incoming data form: street and street number, Bahnofstrasse 7
//street can have two word, street number can contain a letter
extractStreet = function(address){
    var split = address.split(' ');
    var street = '';

    split.forEach(function(part){
        if(!/\d/.test(part))
            street = street + part + ' ';
    })
    return street.substring(0, street.length-1);
}
//Extract street number out of the object Adr. Split string by blanks and only use parts which do contain a number
//Incoming data form: street and street number, Bahnofstrasse 7
//Street can have two word, street number can contain a letter
extractStreetNumber = function(address){
    var split = address.split(' ');
    var streetNumber = '';
    split.forEach(function(part){
        if(/\d/.test(part))
            streetNumber = streetNumber + part;
    })
        return streetNumber;
}

//Extract city out of the object Ort. Split by blanks and only use parts which do not contain a number
//Incoming data form: zipcode and city
//The city can have two words
extractCity = function(zipCity){
    var split = zipCity.split(' ');
    var city = '';
    split.forEach(function(part){
        if(!/\d/.test(part))
            city = city + part + ' ';
    })
    return city.substring(0, city.length-1);
}
