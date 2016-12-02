/* Router pueden considerarse como una mini-aplicacion web con sus propias rutas y su propia cadena midleware 
tiene metodos use(),get(),post()*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saboteur' });
});

module.exports = router;
