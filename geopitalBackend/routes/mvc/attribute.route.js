var express = require('express');
var router = express.Router();

var attributeController = require('../../controllers/attribute.controller');

router.get('/parse', attributeController.parseAttributeTypesFromJSON);
router.get('/', attributeController.getAttributeTypes);
module.exports= router;
