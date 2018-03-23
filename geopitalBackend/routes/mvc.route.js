var express = require('express');
var router = express.Router();

var mvcController = require('../controllers/mvcController.controller')
var fileUpload = require('./mvc/upload.route');

router.get('/', mvcController.index);
router.get('/hospitals', mvcController.hospitalList);
router.get('/addresses', mvcController.addressList);
router.use('/upload/', fileUpload);

module.exports = router;
