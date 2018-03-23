var express = require('express')
var router = express.Router()

var hospitalController = require('../../controllers/hospital.controller')


router.get('/', hospitalController.getHospitals)
router.get('/create', hospitalController.createDummyHospitals)
router.get('/public/dummy', hospitalController.Dummy_getAllHospitalsNoAttributes)
router.get('/public', hospitalController.getAllHospitalsNoAttributes)
router.get('/:id/dummy', hospitalController.Dummy_getHospitalData)
router.get('/:id/', hospitalController.getHospitalData)
module.exports = router
