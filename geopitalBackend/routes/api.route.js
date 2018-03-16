var express = require('express');
var router = express.Router();

var hospitalAddresses = require('./api/geopital.route');
var hospitalList = require('./api/hospital.route');
var fileUpload = require('./api/upload.route');

router.use('/geopital/', hospitalAddresses);
router.use('/hospital/', hospitalList);
router.use('/upload/', fileUpload);

module.exports = router;
