var express = require('express')
var router = express.Router()

var hospitalController = require('../../controllers/hospital.controller')


router.get('/public/dummy', hospitalController.Dummy_getAllHospitalsNoAttributes)
router.get('/public', hospitalController.getAllHospitalsNoAttributes)
router.get('/:id/dummy', hospitalController.Dummy_getHospitalData)
router.get('/:id', hospitalController.getHospitalData)
router.get('/all/data', hospitalController.getAllData)
module.exports = router
