// Require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hospital = require('./hospital.model');

// Define Hospital Schema
var addressSchema = new mongoose.Schema({
	hospital: { type: Schema.Types.ObjectId, ref:'Hospital'},
    street: String,
    streetNumber: Number,
    plz: Number,
    city: String
});

// Compile model from schema
var Address = mongoose.model('Address', addressSchema);

module.export = Address;
