var mongoose = require('mongoose');
var intl = require('mongoose-intl');
var Schema = mongoose.Schema;

var attributeType = require('./attributeType.model');

var attributeSchema = Schema({
  attributeType : {type : Schema.Types.ObjectId, ref: 'AttributeType'},
  value: {type : String}
});

module.exports = mongoose.model('Attribute', attributeSchema);
