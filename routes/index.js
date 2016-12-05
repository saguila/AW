var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	console.log('De camino login');
	res.redirect('login.html');
});

router.post('/login', function(req, res, next) {
	res.redirect('login.html');
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.post('/register', function(req, res, next) {
	var userEsquema = require('../models/usuario');
	var nuevoUsuario = userEsquema({
  		name: req.body.nombre,
  		nick: req.body.nick,
  		password: req.body.pass,
  		sexo: req.body.sexo,
  		fechaNacimiento: req.body.fNacimiento,
  		rutaFoto : ''
	});

	nuevoUsuario.save(function(err) {
  		if (err) throw err;
  		console.log('User saved successfully!');
});
	res.redirect('login.html');
});

module.exports = router;
