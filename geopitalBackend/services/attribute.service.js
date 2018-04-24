// Getting the mongoose model we just created
var mongoose = require('mongoose');
var AttributeType = require('../models/attributeType.model');
var fs = require('fs');

/*
Creates AttributeTypes from JSON file, field with empty codes will be groups,
rows before the first group are ignored.
*/
exports.importAttributeType = function(){
    var obj = JSON.parse(fs.readFileSync('./data/kennzahlen.json', 'utf8'));
    let group = '';
    obj.forEach(function(attributeType){
      if (!attributeType.Code) group = attributeType;
      else saveAttributeType(group, attributeType);
    })
};
/*
Saves the attributeType with the group and its translations
*/
saveAttributeType = async function(group, attributeType) {
    //create new address and fill with data
    var type = new AttributeType({
        _id: new mongoose.Types.ObjectId(),
        code : attributeType.Code,
        name: {
          de: attributeType.Text_DE,
          fr: attributeType.Text_FR,
          it: attributeType.Text_IT,
        },
        group: {
          de: group.Text_DE,
          fr: group.Text_FR,
          it: group.Text_IT
        }


    });
    var savedType = await type.save();
    return savedType;
}
