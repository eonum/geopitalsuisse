var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hospital = require('./hospital.model');

var coordinateSchema =  Schema({
  hospital : {type : Schema.Types.ObjectId, ref:'Hospital'},
  latitude: { type: Number},
  longitude: { type: Number}
});

module.exports = mongoose.model('Coordinates', coordinateSchema);
