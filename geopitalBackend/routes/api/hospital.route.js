var express = require('express')
var router = express.Router()

var hospitalController = require('../../controllers/hospital.controller')


router.get('/', hospitalController.getHospitals)

module.exports = router