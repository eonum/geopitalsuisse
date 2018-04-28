var uploadService = require('../services/upload.service');
var geocodingService = require('../services/geocoding.service');
var attributeService = require('../services/attribute.service');

exports.insertAttributeTypes = async function(req, res){
  var log = await doAttributeTypes();
  console.log(log);
  insertHospitals(res);
}

insertHospitals =  async function (res){
  console.log('Get to geocoding and save hospitals');
  var log = await doInsertHospitals();
  console.log(log);
  // await setTimeout(function () {
    res.redirect('/mvc/hospitals');
  //}, 5000);
}

/*exports.insertCoordinates = async function (req, res){
  geocodingService.addCoordinatesToHospitals();
  await setTimeout(function () {
      res.redirect('/mvc/hospitals');
  }, 5000);
}*/

doInsertHospitals = async function(){
   try {
       uploadService.storeJsonImport('./data/hospital15.json', 2015);
   }catch(err){
       return err.toString();
   }
   return 'Upload successfull';
}

doAttributeTypes = async function(){
    try {
        attributeService.importAttributeType(JSON.parse(fs.readFileSync('./data/kennzahlen.json', 'utf8')));
    } catch (err){

        return err.toString();
    }
    return 'Attributes successfully stored'

}
