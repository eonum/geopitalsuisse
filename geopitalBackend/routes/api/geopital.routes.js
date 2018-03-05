var express = require('express')
var router = express.Router()

var hospitalAddressController = require('../../controllers/geopitalAddress.controller')


router.get('/', hospitalAddressController.getHospitals)

module.exports = router;
