var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var multerFact = multer({ dest: 'uploads' });

router.get('/', function(req, res, next) {
	if (!req.session.usuario) {
        res.render('index');
    }
    //Consulta nativa --> db.partidas.find({estado:"Abierta",jugadores: {$in: ["aa"]}})
    else{
        require('../bin/mongooseResuts').buscarTodasPartidasUsuario(req.session.usuario.nick,function (err,result) {
			res.render('index',{abiertas:result.abiertas,activas:result.activas,finalizadas:result.finalizadas});
        });
	}
});


router.get('/login', function(req, res, next) {
if (req.session.usuario) {
	res.status(403);
	res.render('index');
}
	res.redirect('login.html');
});


router.post('/login', function(req, res, next) {
	if (req.session.usuario) {
		res.status(403);
		res.render('index');
	}
	//Comprobamos que los campos no estan vacios.
	if(req.body.nick.length == 0  && req.body.password.length == 0){
		require('../bin/simpleError').muestraError(res,'Alguno de los campos estan vacios,reviselo','/login',400);
	}
	else{
	var _usuario = require('../models/usuario');
	var formNick = req.body.nick;
	var formPass = req.body.password;
	_usuario.findOne({nick:formNick},function(err,usuario){
    if(!usuario || err){
        require('../bin/simpleError').muestraError(res,'nombre de usuario no existente, ¿es nuevo? ,cree el usuario','/register',404);
    }
    else{
        if(usuario.validaPassword(formPass)){
            var datos = usuario.dameCamposPublicos();
            req.session.usuario = datos;
			require('../bin/simpleError').muestraError(res,usuario.nick + ' se ha logeado correctamente','/',200);
        }
        else{
			require('../bin/simpleError').muestraError(res,'Error al logearse,asegurate de que los credenciales estan bien escritos','/login',401);
        }
    }
    });
	}
});

router.get('/logout',function(req,res,next) {
	if (!req.session.usuario) {
		res.status(403);
		res.render('index');
	}
    //req.sessionID
    //async = require('async');
    req.session.destroy(function(err){
        if(err){
            next();
        }
					require('../bin/simpleError').muestraError(res,'Se ha cerrado session correctamente','/',200);
      //  res.render('index'); // Es asincrono y por eso no va
    }); //hace lo mismo que req.session = null;


});

router.get('/register', function(req, res, next) {
	if (req.session.usuario) {
		res.status(403);
		res.render('index');
	}
    res.redirect('register.html');
});

router.post('/register',multerFact.single("foto"),function(req, res, next) {
	if (req.session.usuario) {
		res.status(403);
		res.render('index');
	}
				//Validador
				if(req.body.nick.length != 0 && req.body.pass.length != 0 && req.body.pass2.length != 0 && req.body.sexo.length != 0 && req.body.fNacimiento.length != 0){
				if(req.body.pass == req.body.pass2){
				if(req.body.sexo == 'H' || req.body.sexo == 'M'){
				if(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(req.body.fNacimiento)){ //Comprobar el formato de la fecha
					var urlFichero = '';
					if (req.file) {
							urlFichero = req.file.path;
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
        if(err){
					require('../bin/simpleError').muestraError(res,'Nick de usuario existente','/register',409);
        }
        else{
					require('../bin/simpleError').muestraError(res,'Se ha creado el usuario correctamente','/',200);
        }
    });
	}
	else{
		require('../bin/simpleError').muestraError(res,'El input de la fecha alterado','/register',404);
	}
	}
	else{
		require('../bin/simpleError').muestraError(res,'El input de Sexo tiene un valor modificado','/register',404);
	}
}
	else{
			require('../bin/simpleError').muestraError(res,'Password de confirmacion diferente','/register',404);
	}
}
	else{
				require('../bin/simpleError').muestraError(res,'Alguno de los campos esta vacio,reviselo','/register',404);
	}
});

router.get('/unirsePartida', function(req, res, next) {
	if (!req.session.usuario) {
		res.status(403);
		res.render('index');
	}
	var _partida = require('../models/partida');

	_partida.find({estado:'Abierta'}).where('jugadores').ne(req.session.usuario.nick).exec(function(err,partida){
		if(err){
				res.render('unirsePartida');
		}
		else{
				res.render('unirsePartida',{partidas:partida});
		}
	});

});

router.post('/unirsePartida/:id', function(req, res, next) {
	if (!req.session.usuario) {
		res.status(403);
		res.render('index');
	}
	else{
        var _partida = require('../models/partida');
        _partida.findByIdAndUpdate(req.params.id,{$push:{jugadores:req.session.usuario.nick}},{safe: true, upsert: true},
        function(err, model) {
            console.log(err);
            res.redirect('/');
        });
       // _partida.update({_id:req.params.id},{$push:{jugadores:req.session.usuario.nick}},done);
	}
});

router.get('/partida/:id', function(req, res, next) {
	if (!req.session.usuario) {
        res.status(403);
        res.render('index');
    }
    else{
		require('../models/comentario');
        require('../models/mano');
		var _partida = require('../models/partida');
		var id = req.params.id;

			_partida.findById(id).populate('_comentarios').exec(function(err,result) {
				console.log(result);
                res.render('partida',{partida:result});
			});
		/*
	var _partida = require('../models/partida');
	_partida.find({_id:id},function(err,partida){
		if(!partida || err){
				require('../bin/simpleError').muestraError(res,'Partida no existente','/',404);
		}
		else{
				res.render('partida',{partidas:partida});
		}
		});*/
	}
});

router.get('/crearPartida', function(req, res, next) {
	if (!req.session.usuario) {
		res.status(403);
		res.render('index');
	}
		res.render('crearPartida');
});

router.post('/crearPartida', function(req, res, next) {
	if (!req.session.usuario) {
		res.status(403);
		res.render('index');
	}

	//Validaciones

	if(req.body.nombrePartida.length != 0 && req.body.numJugadores.length != 0){
		if(Number.isInteger(parseInt(req.body.numJugadores)) && (req.body.numJugadores > 2 && req.body.numJugadores < 8)){ //Para que no hagan la trampa de poner decimales.
			var nTurnos = 0;
			if(req.body.numJugadores === 3){
				nTurnos = 50;
			}
			else if(req.body.numJugadores === 4){
				nTurnos = 45;
			}
			else if(req.body.numJugadores === 7){
				nTurnos = 35;
			}
			else{
				nTurnos = 40;
			}

			var esquemaPartida = require('../models/partida');
			var nuevaPartida = new esquemaPartida({
				creador: req.session.usuario.nick,
				nombre: req.body.nombrePartida,
				jugadores: [req.session.usuario.nick],
				numJugadores: req.body.numJugadores,
				turnosRestantes: nTurnos,
				estado: 'Abierta'
			});
			nuevaPartida.save(function (err) {
					if(err){
						require('../bin/simpleError').muestraError(res,'Error de la BD','/crearPartida',409);
					}
					else{
						require('../bin/simpleError').muestraError(res,'Se ha la partida correctamente','/',200);
					}
			});
		}
		else{
			require('../bin/simpleError').muestraError(res,'Numero de jugadores no valido','/crearPartida',404);
		}
	}
	else{
		require('../bin/simpleError').muestraError(res,'Alguno de los campos esta vacio,reviselo','/crearPartida',404);
	}

});


router.post('/nuevoComentario/:partida/', function(req, res, next) {
    if (!req.session.usuario) {
        res.status(403);
        res.render('index');
    }
    else {
				var _partida = require('../models/partida');
        var esquemaComentario = require('../models/comentario');
        var nuevoComentario = new esquemaComentario({
        	partida:id = req.params.id,
			usuario:req.session.usuario.id,
			mensaje:req.body.nuevoComentario
		});
        nuevoComentario.save(function(err,result){
            if(err){
                require('../bin/simpleError').muestraError(res,err,'/partida/'+ req.params.partida,409);
            }
            else{
							_partida.findByIdAndUpdate(req.params.partida,{$push:{comentarios:result}},{safe: true, upsert: true},
			        function(err, model) {
			            require('../bin/simpleError').muestraError(res,'Comentario realizado!','/partida/'+ req.params.partida,200);
			        });
								//
            }
		});
    }
});


router.post('/eliminarPartida', function(req, res, next) {
    if (!req.session.usuario) {
        res.status(403);
        res.render('index');
    }
    else{
        var _partida = require('../models/partida');
        _partida.findOneAndRemove({_id:req.body.id,creador:req.session.usuario.nick},function(err,result){
        	if(err){
                require('../bin/simpleError').muestraError(res,'Error interno','/',500)
            }
        	if(result.length == 0){
        		require('../bin/simpleError').muestraError(res,'Operación no permitida,estas intentando borrar una partida que no has creado tu','/',401);
            }

		});
        res.redirect('/');
    }
});


module.exports = router;
