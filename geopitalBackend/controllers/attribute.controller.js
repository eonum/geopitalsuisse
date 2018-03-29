const attributeService = require('../services/attribute.service');
const AttributeType = require('../models/attributeType.model');
exports.parseAttributeTypesFromJSON = async function(req,res,next){
  try{
    attributeService.importAttributeType();
    await setTimeout(function () {
        res.redirect('/api/attributes');
    }, 5000);
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}

exports.getAttributeTypes = function(req, res, next){
  try{
    AttributeType.find().exec(function(err, attributeTypes){
      return res.status(200).json({status: 200, data: attributeTypes, message: "Got List of AttributeTypes"});
    });

  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}
