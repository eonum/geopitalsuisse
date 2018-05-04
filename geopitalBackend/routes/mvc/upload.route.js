var express = require('express')
var router = express.Router()
var multer = require('multer')

var uploadController = require('../../controllers/upload.controller');
var initController = require('../../controllers/init.controller');


router.get('/', uploadController.upload)
router.post('/', uploadController.uploadExcelToJson)
router.post('/storeJson', uploadController.fileToDBPost)
router.post('/newAttributes', uploadController.storeNewAttributes)


module.exports = router;
