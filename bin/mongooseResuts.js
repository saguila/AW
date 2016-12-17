var _partida = require('../models/partida');

function buscarPartidasUsuario(usuario,estado,callback,array){
    _partida.find({estado:estado}).where('jugadores').in(usuario).exec(function(err,result){
        if(err) callback(err,null);
        else{
            callback(null,array.push(result));
        }
    });
}

function buscarPartidasUsuario2(usuario,estado,callback){
    _partida.find({estado:estado}).where('jugadores').in(usuario).exec(function(err,result){
        if(err) callback(err,null);
        else{
            callback(null,result);
        }
    });
}

function partidasCreadasUsuario(usuario,callback){
_partida.find({estado:'Abierta',creador:usuario},function(err,result){
  if(err) callback(err,null);
  else callback(null,result);
});
}

module.exports = {
buscarPartidasUsuario : function(usuario,estado,callback,array){
    _partida.find({estado:estado}).where('jugadores').in(usuario).exec(function(err,result){
        if(err) callback(err,null);
        else{
            callback(null,array.push(result));
        }
    });
}
,
buscarTodasPartidasUsuario : function(stringUser,callback) {
    var usuario = []; // $in recibe arrays no strings
    usuario.push(stringUser);
    var partidas = [];
    buscarPartidasUsuario(usuario, 'Abierta', function (err, result) {
        buscarPartidasUsuario(usuario, 'Activa', function (err, result) {
            buscarPartidasUsuario(usuario, 'Finalizada', function (err, result) {
                callback(null, {abiertas: partidas[0], activas: partidas[1], finalizadas: partidas[2]})
            }, partidas);
        }, partidas);
    }, partidas);
},
    consultaIndex : function(stringUser,callback){
    var arrayUser = [];
    arrayResult = [];
    arrayUser.push(stringUser);
    partidasCreadasUsuario(stringUser,function (err,result1) {
        buscarPartidasUsuario2(arrayUser,'Activa',function(err,result2){
            buscarPartidasUsuario2(arrayUser,'Finalizada',function(err,result3){
                callback(null,{abiertas: result1, activas: result2, finalizadas: result3});
            });
        });
    });

    }
}
