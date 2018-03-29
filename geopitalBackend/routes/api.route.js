var express = require('express');
var router = express.Router();

var hospital = require('./api/hospital.route');
var attributeController = require('../controllers/attribute.controller');

router.use('/hospital/', hospital);
router.get('/attributes/', attributeController.getAttributeTypes);


module.exports = router;
