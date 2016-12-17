var mongoose = require('mongoose');
var conf = require('../config');

mongoose.connect(conf.DB.uri,conf.DB.options);
var Schema = mongoose.Schema;

/* Creamos un esquema para los usuarios */
var esquemaUsuario = new Schema({
  nick: { type: String, required: true, unique: true },
  nombre: {type:String,default:'Noname'},
  password: { type: String, required: true },
  sexo: { type: String,enum:['H','M'],required:true }, //Posibles valores que pueda tomar
  fechaNacimiento: { type : Date, required: true },
  rutaFoto: String,
  //partidasAbiertas: [{type:Schema.ObjectId,ref:'partida'}]
});

esquemaUsuario.methods.dameCamposPublicos = function(){
    return {
        id: this._id,
        nick: this.nick,
        nombre: this.nombre,
        foto: this.rutaFoto,
        sexo: this.sexo
    };
}

esquemaUsuario.methods.validaPassword = function(password){
    return this.password === password;
}
/*
esquemaUsuario.methods.encriptarPassword = function(password) {
    var crypt = require('crypto');
    return crypt.createHmac('sha1', this.salt).update(password).digest('hex');
};

esquemaUsuario.methods.generarHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};*/
/*
esquemaUsuario.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};*/

/* Usando el modelo creamos el usuario */
var usuario = mongoose.model('usuario', esquemaUsuario);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = usuario;
