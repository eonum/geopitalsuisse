var uploadService = require('../services/upload.service');
var Hospital = require('../models/hospital.model');
var mv = require('mv');
var excel2Json = require('node-excel-to-json');
var fs = require('fs');
var convertExcel = require('excel-as-json').processFile;
// Saving the context of this module inside the _the variable
var geocodingService = require('../services/geocoding.service');
_this = this;


// Async Controller function to get the hospital list
exports.upload= function(req, res){
    res.render('upload', {title: 'Excel Upload'});
}

exports.parse = function (req, res){
  geocodingService.addCoordinatesToHospitals();
  return("Success");
}

exports.uploadPost= function (req, res) {
    //Clear uploads directory
    uploadService.uploadsDelete();
    // Was a file uploaded?
    if (!req.files.foo)
        return res.status(400).send('No files were uploaded!');
    else{
        //saved file to uploads/ with the filename hospitalData
        req.files.foo.mv('uploads/hospitalData.xlsx', function (err) {
            if(err)
                return res.status(400).send(err.toString());


        })

        //convert excel to json and stores it to the uploads directory
        convertExcel('uploads/hospitalData.xlsx', 'uploads/hospitalData.json')

        uploadService.storeJsonImport();

        res.end('File uploaded!')
    }



}
