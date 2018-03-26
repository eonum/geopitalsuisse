var express = require('express');
var router = express.Router();

var hospitalAddresses = require('./api/geopital.route');
var hospitalList = require('./api/hospital.route');
var attributeController = require('../controllers/attribute.controller');

router.use('/geopital/', hospitalAddresses);
router.use('/hospital/', hospitalList);
router.get('/attributes/', attributeController.getAttributeTypes);


module.exports = router;
