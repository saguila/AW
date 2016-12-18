var mongoose = require('mongoose');
var conf = require('../config');

mongoose.connect(conf.DB.uri,conf.DB.options);
var Schema = mongoose.Schema;
var esquemaMano = new Schema({
    partida: {type: Schema.ObjectId, ref:'partida'},
    usuario: String,
    juego: {type:String,enum:['Saboteador','Buscador']},
    cartas: {type: [Number] ,ref:'carta'}
});

/* Usando el modelo creamos el mano */
var mano = mongoose.model('mano', esquemaMano);

/* Devolvemos el modelo para que pueda ser mano */
module.exports = mano;
