// Require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Address = require('./address.model');
var Coordinates = require('./coordinates.model');
var Attribute = require('./attribute.model');

// Define Hospital Schema
var hostpitalSchema = Schema({
	year: {type: Number},
  name: {type: String},
  address: {type: Schema.Types.ObjectId, ref:'Address'},
	coordinates: {type : Schema.Types.ObjectId, ref: 'Coordinates'},
	attributes: [{type: Schema.Types.ObjectId, ref: 'Attribute'}]
});

module.exports = mongoose.model('Hospital', hostpitalSchema);
