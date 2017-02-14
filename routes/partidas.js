var express = require('express');
var router = express.Router();
var comprobacion = require('../bin/comprobaciones');
var dialog = require('../bin/simpleError').muestraMensaje;


router.get('/crearPartida',comprobacion.autentificacionRequerida,function(req, res, next) {
		res.render('crearPartida');
});

router.post('/crearPartida',comprobacion.autentificacionRequerida,function(req, res, next) {

	//Validaciones
	if(req.body.nombrePartida.length != 0 && req.body.numJugadores.length != 0){
		if(Number.isInteger(parseInt(req.body.numJugadores)) && (req.body.numJugadores > 2 && req.body.numJugadores < 8)){ //Para que no hagan la trampa de poner decimales.
			var nTurnos = 0;
			var esquemaPartida = require('../models/partida');
			var nuevaPartida = new esquemaPartida({
				creador: req.session.usuario.nick,
				nombre: req.body.nombrePartida,
				jugadores: [{nombre:req.session.usuario.nick}],
				numJugadores: req.body.numJugadores,
				turnosRestantes: nTurnos,
				estado: 'Abierta'
			});
			nuevaPartida.save(function (err) {
					if(err){
						console.log(err);
						dialog(res,'Error de la BD','/crearPartida',409);
					}
					else{
                        dialog(res,'Partida creada correctamente','/',200);
					}
			});
		}
		else{
			dialog(res,'Numero de jugadores no valido','/crearPartida',404);
		}
	}
	else{
		dialog(res,'Alguno de los campos esta vacio,reviselo','/crearPartida',404);
	}

});

router.post('/cerrarPartida',comprobacion.autentificacionRequerida, function(req, res, next) {
	var gestorPartidas = require('../bin/gestorPartidas');
    var _partida = require('../models/partida');
    _partida.findOne({_id:req.body.id,creador:req.session.usuario.nick},function (err,partida) {
		if(partida){
			if(partida.numeroJugadores() > 2){
			gestorPartidas.iniciaPartida(partida.id,function(err,result){
				if(result)  dialog(res,partida.nombre +' pasada a activa','/',200);
			});
		}
			else{
               dialog(res,'No se puede cerrar la partida numJugador < 3','/',404);
			}
		}
		else{
            dialog(res,'Operacion no permitida','/',404);
		}
    });
});

router.post('/eliminarPartida',comprobacion.autentificacionRequerida, function(req, res, next) {
        var _partida = require('../models/partida');
        _partida.findOneAndRemove(req.body.id,{creador:req.session.usuario.nick},function(err,result){
        	if(err){
                dialog(res,'Error interno','/',500)
            }
        	if(result.length == 0){
        		dialog(res,'Operación no permitida,estas intentando borrar una partida que no has creado tu','/',401);
            }

		});
        res.redirect('/');
});

router.get('/unirsePartida',comprobacion.autentificacionRequerida, function(req, res, next) {
	var _partida = require('../models/partida');
	_partida.find({estado:'Abierta'}).where('jugadores.nombre').ne(req.session.usuario.nick).exec(function(err,partida){
		if(err){
				res.render('unirsePartida');
		}
		else{
				res.render('unirsePartida',{partidas:partida});
		}
	});
});

router.post('/unirsePartida/:id',comprobacion.autentificacionRequerida, function(req, res, next) {
	var _partida = require('../models/partida');
    var gestorPartidas = require('../bin/gestorPartidas');
    _partida.findByIdAndUpdate(
        req.params.id,
        {$push: {"jugadores": {nombre:req.session.usuario.nick}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            if(err) console.log(err);
        	if(model.numeroJugadores() == model.numJugadores) {
                gestorPartidas.iniciaPartida(model.id, function (err, result) {
                    if (result) dialog(res, 'Se ha unido a ' + model.nombre + ' y empieza la partida!', '/', 200);
                });
            }
            else dialog(res,'Se ha unido correctamente a la partida '+ model.nombre ,'/',200);
        }
    );
});


router.get('/partida/:id',comprobacion.autentificacionRequerida,function(req, res, next) {
		var _partida = require('../models/partida');
    	var gestorPartidas = require('../bin/gestorPartidas');
		var id = req.params.id;
    	var tbl = [];
    	var crts = [];
    	var picoo = '';
    	var juegoo = '';
			_partida.findById(id).exec(function(err,result) {

                if(result.tablero !== undefined) {
                    var salir = false;
                    for (i = 0; i < result.tablero.length; i++) {
                        tbl.push({id: result.tablero[i], foto: gestorPartidas.devolverFoto(result.tablero[i])});
                    }

                    //Sacamos nuestras cartas y sus fotos
                    for (i = 0; i < result.jugadores.length && !salir; i++) {
                        if (result.jugadores[i].nombre == req.session.usuario.nick) {
                        	juegoo = result.jugadores[i].juego;
                        	picoo = result.jugadores[i].pico;
                            for (j = 0; j < result.jugadores[i].mano.length; j++) {
                                crts.push({
                                    id: result.jugadores[i].mano[j],
                                    foto: gestorPartidas.devolverFoto(result.jugadores[i].mano[j])
                                });
                            }
                            salir = true;
                        }
                    }
                }
                res.render('partida',{juego:juegoo,pico:picoo,tablero:tbl,cartas:crts,comentarios:result.comentarios,partida:result.dameCamposPublicos()});
			});
});

/* Añade un nuevo comentario a los comentarios de la partida */
router.post('/nuevoComentario/:partida/',comprobacion.autentificacionRequerida, function(req, res, next) {

	var _partida = require('../models/partida');
    _partida.findByIdAndUpdate(
        req.params.partida,
        {$push: {"comentarios": {usuario:req.session.usuario.nick,fecha:Date.now(),mensaje:req.body.nuevoComentario}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            if(err) console.log(err);
            else dialog(res,'Comentario realizado!','/partida/'+ req.params.partida,200)
        }
    );
});

router.get('/img/:nick',function(req,res,next){
	var path = require('path');
	var p = path.join(__dirname,'..','uploads','profile-'+req.params.nick);
    res.sendFile(p);
});

router.post('/jugarCarta/:partida/',comprobacion.autentificacionRequerida, function(req, res, next) {
    if(comprobacion.esSuTurno(req.params.partida,req.session.usuario.nick)) {
        var gestorPartidas = require('../bin/gestorPartidas');
        gestorPartidas.jugarCarta(req.params.partida,Number(req.body.selCarta), req.session.usuario.nick, Number(req.body.selTablero), req.body.opcion, function (err, result) {
        	if(err){
                dialog(res,err,'/partida/'+req.params.partida,500);
			}
			else{
                dialog(res,'Realizado Correctamente ','/partida/'+req.params.partida,500);
			}
        });
    }
	else{
    	dialog(res,'Respeta los turnos' ,'/partida/'+req.params.partida,500);
	}
});

module.exports = router;
