var express = require('express')
var router = express.Router()

var geopitalAddressController = require('../../controllers/geopitalAddress.controller')


router.get('/', geopitalAddressController.getHospitals)
router.get('/dummy', geopitalAddressController.getDummyHospitals)

module.exports = router;
