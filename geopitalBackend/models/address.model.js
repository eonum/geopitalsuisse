// Require mongoose
var mongoose = require('mongoose');

// Define Hospital Schema
var Schema = new mongoose.Schema;

var addressSchema = new Schema({
    street: String,
    streetNumber: Number,
    plz: Number,
    city: String
});

// Compile model from schema
var addresslModel = mongoose.model('addressModel', addressSchema);
