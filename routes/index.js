var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('En index1!!');
  //res.render('index', { title: 'Express' });
});

module.exports = router;
