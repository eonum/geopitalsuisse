// Require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hospital = require('./hospital.model');

// Define Hospital Schema
var addressSchema = new mongoose.Schema({
	hospital: { type: Schema.Types.ObjectId, ref:'Hospital'},
    street: String,
    streetNumber: String,//A street number can contain a letter: 23a
    plz: Number,
    city: String
});

addressSchema.virtual('line').get(function(){
	return this.street+' '+this.streetNumber+', '+this.plz+' '+this.city
});
// Virtual for author's full name
addressSchema
.virtual('name')
.get(function () {
  return this.street + ', ' + this.plz;
});

// Compile model from schema

module.exports = mongoose.model('Address', addressSchema);;
