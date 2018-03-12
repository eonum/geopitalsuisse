var express = require('express');
var router = express.Router();

var mvcController = require('../controllers/mvcController.controller')

router.get('/', mvcController.index);
router.get('/hospitals', mvcController.hospitalList);

module.exports = router;
