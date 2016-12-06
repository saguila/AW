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

router.get('/test', function(req, res, next) {
  /*  var mongoose = require('mongoose');
    var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
    var conn = mongoose.createConnection(URL_DB),
        MyModel = conn.model('ModelName', new mongoose.Schema({test :String})),
        m = new MyModel;
    m.save(); // works
*/
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.post('/register', function(req, res, next) {
    var userEsquema = require('../models/usuario');
    new userEsquema({
        name: req.body.nombre//,
       /* nick: req.body.nick,
        password: req.body.pass,
        sexo: req.body.sexo,
        fechaNacimiento: req.body.fNacimiento,
        rutaFoto : ''*/
    }).save(function (err) {
        if(err){
            console.log(err);
        }
        else{
            console.log('User saved successfully!');
            res.redirect('login.html');
        }
    });
});

module.exports = router;
