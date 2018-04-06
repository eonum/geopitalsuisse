var uploadService = require('../services/upload.service');
var fs = require('fs');
var convertExcel = require('excel-as-json').processFile;

// Saving the context of this module inside the _the variable
_this = this;

/*
 Async Controller function to get the hospital list
 */
exports.upload= function(req, res){
    var listJson = fs.readdirSync('../uploads/json');
    res.render('upload', {title: 'Excel Upload', listJson: listJson});
}

/*
Stores a selected json file in database
 */
exports.fileToDBPost = async function(req, res) {
    await uploadService.storeJsonImport('../uploads/json/' + req.body.fileName);
    res.redirect('/mvc/upload');
}

/*
Takes the uploaded file, stores it in the folder ../uploads/xlsx and parses it to json (../uploads/json)
 */
exports.uploadExcelToJson= async function (req, res) {
    var fileName = '';
    // Was a file uploaded?
    if (!req.files.foo)
        return res.status(400).send('No files were uploaded!');
    else{
        fileName = req.files.foo.name.split('.')[0];
        //saved file to uploads/ with the filename hospitalData
        req.files.foo.mv('../uploads/xlsx/'+ fileName +'.xlsx', function (err) {
            if(err)
                return res.status(400).send(err.toString());


        })

        //convert excel to json and stores it to the uploads directory
        try {
            await convertExcel('../uploads/xlsx/'+ fileName +'.xlsx', '../uploads/json/'+ fileName +'.json')
        } catch (err) {
            console.log('Excel to Json Error: ' + err)
            return res.status(500).send()
        }

        //wait 100 ms for saving json file before reload page -- if you have a better way to do this, please tell me!!
        try {
            await setTimeout(function () {
                res.redirect('/mvc/upload');
            }, 100);

        }catch(err){
            console.log(err);
        }

    }

}
