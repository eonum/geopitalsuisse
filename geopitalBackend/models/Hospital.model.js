// Require mongoose
var mongoose = require('mongoose');

// Define Hospital Schema
var Schema = new mongoose.Schema;

var hostpitalSchema = new Schema({
    name: String
});

// Compile model from schema
var hospitalModel = mongoose.model('hospitalModel', hostpitalSchema);