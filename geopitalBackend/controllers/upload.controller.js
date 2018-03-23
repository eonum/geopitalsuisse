var uploadService = require('../services/upload.service');
var Hospital = require('../models/hospital.model');
var mv = require('mv');
var excel2Json = require('node-excel-to-json');
var fs = require('fs');
var convertExcel = require('excel-as-json').processFile;
// Saving the context of this module inside the _the variable
var geocodingService = require('../services/geocoding.service');
var fs = require('fs');
_this = this;


// Async Controller function to get the hospital list
exports.upload= function(req, res){
    var listJson = fs.readdirSync('../uploads/json');
    res.render('upload', {title: 'Excel Upload', listJson: listJson});
}

exports.parse = function (req, res){
  geocodingService.addCoordinatesToHospitals();
  return("Success");
}

exports.uploadPost= async function (req, res) {
    //Clear uploads directory
    uploadService.uploadsDelete();
    // Was a file uploaded?
    if (!req.files.foo)
        return res.status(400).send('No files were uploaded!');
    else{
        //saved file to uploads/ with the filename hospitalData
        req.files.foo.mv('../uploads/xlsx/hospitalData.xlsx', function (err) {
            if(err)
                return res.status(400).send(err.toString());


        })
        
        //convert excel to json and stores it to the uploads directory
        try {
            await convertExcel('../uploads/xlsx/hospitalData.xlsx', '../uploads/json/hospitalData.json')
        } catch (err) {
            console.log('Excel to Json Error: ' + err)
            return res.status(500).send()
        }
        

        //uploadService.storeJsonImport();

        //wait for saving json file before reload page -- if you have a better way to do this, please tell me!!
        try {
            await setTimeout(function () {
                res.redirect('/mvc/upload');
            }, 100);

        }catch(err){
            console.log(err);
        }

    }

}
