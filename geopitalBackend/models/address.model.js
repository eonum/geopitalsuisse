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

// Export function to create "addressModel" model class
module.export = addresslModel;