var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerFact = multer({dest: 'uploads'});
var comprobacion = require('../bin/comprobaciones');
var dialog = require('../bin/simpleError').muestraMensaje;

router.get('/login', comprobacion.noAutentificado, function (req, res, next) {
    res.redirect('login.html');
});

router.post('/login', comprobacion.noAutentificado, function (req, res, next) {

    //Comprobamos que los campos no estan vacios.
    if (req.body.nick.length == 0 && req.body.password.length == 0) {
        dialog(res, 'Alguno de los campos estan vacios,reviselo', '/login', 400);
    }
    else {
        var _usuario = require('../models/usuario');
        var formNick = req.body.nick;
        var formPass = req.body.password;
        _usuario.findOne({nick: formNick}, function (err, usuario) {
            if (!usuario || err) {
                dialog(res, 'nombre de usuario no existente, ¿es nuevo? ,cree el usuario', '/register', 404);
            }
            else {
                if (usuario.validaPassword(formPass)) {
                    var datos = usuario.dameCamposPublicos();
                    req.session.usuario = datos;
                    dialog(res, usuario.nick + ' se ha logeado correctamente', '/', 200);
                }
                else {
                    dialog(res, 'Error al logearse,asegurate de que los credenciales estan bien escritos', '/login', 401);
                }
            }
        });
    }
});

router.get('/logout', comprobacion.autentificacionRequerida, function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next();
        }
        dialog(res, 'Se ha cerrado session correctamente', '/', 200);
    }); //hace lo mismo que req.session = null;
});

router.get('/register', comprobacion.noAutentificado, function (req, res, next) {
    res.redirect('register.html');
});

router.post('/register', comprobacion.noAutentificado, multerFact.single("foto"), function (req, res, next) {
    //Validador
    if (req.body.nick.length != 0 && req.body.pass.length != 0 && req.body.pass2.length != 0 && req.body.sexo.length != 0 && req.body.fNacimiento.length != 0) {
        if (req.body.pass == req.body.pass2) {
            if (req.body.sexo == 'H' || req.body.sexo == 'M') {
                if (/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(req.body.fNacimiento)) { //Comprobar el formato de la fecha
                    var path = require('path');
                    var fs = require('fs');
                    var urlFichero = path.join("uploads","profile-" + req.body.nick);
                    if (req.file) {
                        fs.rename(req.file.path, urlFichero, function(err) {
                            if ( err ) console.log(err);
                        });
                    }
                    else{//Copiamos una imagen por defecto
                        var from = path.join("uploads",'no-profile-image.ico');
                        fs.createReadStream(from).pipe(fs.createWriteStream(urlFichero));
                    }
                    var esquemaUsuario = require('../models/usuario');
                    var nuevoUsuario = new esquemaUsuario({
                        nombre: req.body.nombre,
                        nick: req.body.nick,
                        password: req.body.pass,
                        sexo: req.body.sexo,
                        fechaNacimiento: req.body.fNacimiento,
                        rutaFoto: urlFichero
                    });
                    nuevoUsuario.save(function (err) {
                        if (err) {
                            dialog(res, 'Nick de usuario existente', '/register', 409);
                        }
                        else {
                            dialog(res, 'Se ha creado el usuario correctamente', '/', 200);
                        }
                    });
                }
                else {
                    dialog(res, 'El input de la fecha alterado', '/register', 404);
                }
            }
            else {
                dialog(res, 'El input de Sexo tiene un valor modificado', '/register', 404);
            }
        }
        else {
            dialog(res, 'Password de confirmacion diferente', '/register', 404);
        }
    }
    else {
        dialog(res, 'Alguno de los campos esta vacio,reviselo', '/register', 404);
    }
});


module.exports = router;
