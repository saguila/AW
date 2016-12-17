var mongoose = require('mongoose');
var conf = require('../config');

mongoose.connect(conf.DB.uri,conf.DB.options);
var Schema = mongoose.Schema;
/* Creamos un esquema para los partidas */
var esquemaPartidas = new Schema({
    creador: { type: String, required: true},
    nombre: String,
    //fecha: { type : Date, default:Date.now()},
    jugadores: [{type:String,unique: true}],
    numJugadores: {type:Number,min:3,max:7},
    turnosRestantes: Number,
    turnoPara: String,
    tablero:{type:[Number],min:0,max:22,default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    manos : [{type:Schema.ObjectId,ref:'mano'}],
    comentarios:[{type:Schema.ObjectId,ref:'comentario'}],
    estado: {type:String,enum:['Abierta','Activa','Finalizada']},
    ganadores: {type:String,enum:['Saboteador','Buscador']}
});

esquemaPartidas.methods.dameFecha = function(){
  return this._id.getTimestamp();
}

esquemaPartidas.methods.esCreador = function(nick){
    return this.creador == nick;
}

esquemaPartidas.methods.dameNumJugadores = function () {
return '' + this.jugadores.length +'/'+ this.numJugadores;
}

esquemaPartidas.methods.dameCamposPublicos = function(){
    return {
        id:this._id,
        nombre: this.nombre,
        fecha: this._id.getTimestamp(),
        jugadores: this.jugadores,
        creador: this.creador,
        estado: this.estado,
        turnoPara:this.turnoPara,
    };
}

/* Usando el modelo creamos el usuario */
var partida = mongoose.model('partida', esquemaPartidas);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = partida;
