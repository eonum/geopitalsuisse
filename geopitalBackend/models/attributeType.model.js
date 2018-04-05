var mongoose = require('mongoose');
var intl = require('mongoose-intl');
var Schema = mongoose.Schema;

var attributeTypeSchema = Schema({
  code: {type : String},
  name: {type : String, intl: true},
  group: {type: String, intl: true}
});

attributeTypeSchema.plugin(intl, {languages: ['en', 'de', 'fr', 'it'],
  defaultLanguage: 'de'});

module.exports = mongoose.model('AttributeType', attributeTypeSchema);
