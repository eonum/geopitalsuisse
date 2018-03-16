// Getting the mongoose model we just created
var mongoose = require('mongoose');
var Hospital = require('../models/hospital.model');
var Address = require('../models/address.model');
const del = require('del');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the hospital list
exports.uploadsDelete = function(){
    del('uploads/*');
}



