var express = require('express')
var router = express.Router()
var multer = require('multer')

var uploadController = require('../../controllers/upload.controller');
var initController = require('../../controllers/init.controller');

router.get('/start', initController.insertAttributeTypes)
router.get('/hospitals', initController.insertHospitals)
router.get('/coords', initController.insertCoordinates)

module.exports = router;
