var express = require('express');
var router = express.Router();

var property = require("../controllers/PropertyController");

router.get('/properties',property.show);

router.post('/properties', property.save);

module.exports=router;
