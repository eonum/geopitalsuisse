var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hospital = require('./hospital.model');

var coordinateSchema =  Schema({
  hospital : {type : Schema.Types.ObjectId, ref:'Hospital'},
  latitude: { type: String},
  longitude: { type: String}
});

module.exports = mongoose.model('Coordinates', coordinateSchema);
