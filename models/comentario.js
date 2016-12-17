var mongoose = require('mongoose');
var conf = require('../config');

mongoose.connect(conf.DB.uri,conf.DB.options);
var Schema = mongoose.Schema;
var esquemaComentario = new Schema({
    partida: {type: Schema.ObjectId,ref:'partida'},
    usuario: {type: Schema.ObjectId,ref:'usuario'},
    mensaje: String
});

/* Usando el modelo creamos el comentario */
var comentario = mongoose.model('comentario', esquemaComentario);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = comentario;