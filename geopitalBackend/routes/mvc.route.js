var express = require('express');
var router = express.Router();

var mvcController = require('../controllers/mvcController.controller')
var fileUpload = require('./mvc/upload.route');
var init = require('./mvc/init.route');

router.get('/', mvcController.index);
router.get('/hospitals', mvcController.hospitalList);
router.get('/addresses', mvcController.addressList);
router.get('/coordinates', mvcController.hospitalListCoordinates);
router.use('/upload/', fileUpload);
router.use('/init', init);

module.exports = router;
