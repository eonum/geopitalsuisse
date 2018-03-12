// Require mongoose
var mongoose = require('mongoose');
var addressModel = require('../models/address.model');

// Define Hospital Schema
var hostpitalSchema = new mongoose.Schema({
    name: String,
    //address : { type: Schema.Types.ObjectId, ref: 'addressModel' }
});

// Compile model from schema
var hospitalModel = mongoose.model('hospitalModel', hostpitalSchema);

module.export = hospitalModel;
