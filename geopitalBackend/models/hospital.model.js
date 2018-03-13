// Require mongoose
var mongoose = require('mongoose');
var Address = require('./address.model')
var Schema = mongoose.Schema

// Define Hospital Schema
var hostpitalSchema = Schema({
	year: {type: Number},
    name: {type: String},
    address: {type: Schema.Types.ObjectId, ref:'Address'}
});

// Compile model from schema
module.exports = mongoose.model('Hospital', hostpitalSchema);

