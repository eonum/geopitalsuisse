// Require mongoose
var mongoose = require('mongoose');

// Define Hospital Schema
var addressSchema = new mongoose.Schema({
    street: String,
    streetNumber: Number,
    plz: Number,
    city: String
});

// Compile model from schema
var addresslModel = mongoose.model('addressModel', addressSchema);

module.export = addresslModel;