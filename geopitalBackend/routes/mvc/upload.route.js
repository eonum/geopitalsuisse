var express = require('express')
var router = express.Router()
var multer = require('multer')

var uploadController = require('../../controllers/upload.controller');
var initController = require('../../controllers/init.controller');


router.get('/', uploadController.upload)
router.post('/', uploadController.uploadPost)
router.get('/parse', uploadController.parse)
router.get('/init/hospitals', initController.insertHospitals)
router.get('/init/coords', initController.insertHospitals)

module.exports = router;
