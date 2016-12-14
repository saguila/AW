/**
 * Created by saguila on 14/12/16.
 */

var _partida = require('../models/partida');

function buscarPartidasUsuario(usuario,estado,callback,array){
    _partida.find({estado:estado}).where('jugadores').in(usuario).exec(function(err,result){
        if(err) callback(err,null);
        else{
            callback(null,array.push(result));
        }
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
}
}
