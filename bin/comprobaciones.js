consultas = require('../bin/consultasbd');
module.exports = {
  noAutentificado :function (req,res,next){
  	if (!req.session.usuario) {
  		next();
  	}
  	else{
  		res.status(403);
  		res.redirect('/');
  	}
  }
,
autentificacionRequerida: function (req,res,next){
  	if (req.session.usuario) {
  		next();
  	}
  	else{
  		res.status(403);
  		res.redirect('/');
  	}
  }
  ,
	usuarioEnPartida: function (req,res,next){
	arrayUser = [];
	arrayUser.push(req.session.usuario);
	consultas.findOne('partida',{},function (err,result) {

    });
	}
	,
	esSuTurno: function (idPartida,idUsuario){
        var _partida = require('../models/partida');
        _partida.findById(idPartida,function (err,partida) {
        	if(partida.turnoPara == idUsuario) return true;
        	else return false;
        });
        return true;
    }
}
