var express = require('express')
var router = express.Router()

var hospitalAddresses = require('./api/geopital.routes')

router.use('/hospital/', hospitalAddresses)

module.exports = router;
