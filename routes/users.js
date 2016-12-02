var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt') // Doc en --> https://github.com/kelektiv/node.bcrypt.js
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
