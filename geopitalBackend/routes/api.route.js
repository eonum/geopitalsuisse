var express = require('express');
var router = express.Router();

var hospitalAddresses = require('./api/geopital.route');
var hospitalList = require('./api/hospital.route');

router.use('/geopital/', hospitalAddresses);
router.use('/hospital/', hospitalList);

module.exports = router;
