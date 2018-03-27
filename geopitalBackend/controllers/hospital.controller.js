var hospitalService = require('../services/hospital.service');
var Hospital = require('../models/hospital.model');
var geopitalService = require('../services/dummy.service');

var Attribute = require('../models/attribute.model');
// Saving the context of this module inside the _the variable

_this = this;

exports.getAllHospitalsNoAttributes = async function(req, res, next){
  try{
    Hospital.find().populate('coordinates').populate('address')
      .exec( async function (err, hospitals){
        hospitals.forEach(function(hospital){ delete hospital.attributes });
      return res.status(200).json({status: 200, data: hospitals});
    });
  }catch(e){
    return res.status(400).json({status:400, message: "Here" + e.message});
  }
  //return res.status(400).json({status:400, message: 'Not yet implemented!'});
}
exports.Dummy_getAllHospitalsNoAttributes = async function(req, res, next){
  try{
    const hospitals = await geopitalService.getDummyHospitals();
    for(var i= 0; i < hospitals.length; i++){
      delete hospitals[i].attributes;
    }
    return res.status(200).json({status: 200, data: hospitals});
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}

exports.Dummy_getHospitalData = async function(req, res, next){
  try{
    const hospitals = await geopitalService.getDummyHospitals();
    return res.status(200).json({status: 200, data: hospitals[req.params.id]});
  }catch(e){
    return rest.status(400).json({status:400, message: e.message});
  }
}

exports.getHospitalData = async function(req, res, next){
  try{
    Hospital.findOne().populate('coordinates address')
      .populate({
        path : 'attributes',
        populate :{
          path : 'attributeType',
          model: 'AttributeType'
        }
    }).exec(function (err, hospitals){
      return res.status(200).json({status: 200, data: hospitals});
    });
  }catch(e){
    return res.status(400).json({status:400, message: e.message});
  }
}
