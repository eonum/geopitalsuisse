var express = require('express')
var router = express.Router()
var multer = require('multer')

var uploadController = require('../../controllers/upload.controller')


router.get('/', uploadController.upload)
router.post('/', uploadController.uploadPost)
router.get('/parse', uploadController.parse)
router.post('/fileName', uploadController.fileToDBPost)

module.exports = router;
