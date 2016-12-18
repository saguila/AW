var mongoose = require('mongoose');
var conf = require('../config');

mongoose.connect(conf.DB.uri,conf.DB.options);
var Schema = mongoose.Schema;
var esquemaCarta = new Schema({
    identificador: {type :Number,unique:true},
    salidas: {type: [Boolean]},
    foto: String
});

/* Usando el modelo creamos el comentario */
var carta = mongoose.model('carta', esquemaCarta);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = carta;
