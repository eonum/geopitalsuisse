var express = require('express');
var router = express.Router();

var mvcController = require('../controllers/mvcController.controller');
var hospitalController = require('../controllers/hospital.controller');
var fileUpload = require('./mvc/upload.route');
var init = require('./mvc/init.route');
var attribute = require('./mvc/attribute.route');

router.get('/', mvcController.index);
router.get('/hospitals', mvcController.hospitalList);
router.get('/addresses', mvcController.addressList);
router.get('/coordinates', mvcController.hospitalListCoordinates);
router.use('/upload/', fileUpload);
router.use('/init', init);
router.use('/attribute', attribute)
router.use('/reloadCoordinates', hospitalController.reloadCoordinates)

module.exports = router;
