var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
var mongoose = require('mongoose');
mongoose.connect(URL_DB);
// var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

/* Creamos un esquema para los usuarios */
var esquemaUsuario = new schema({
  name: String,
  nick: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sexo: { type: String, required:true },
  fechaNacimiento: { type : Date, required: true },
  rutaFoto: String
});

/*
Funcionalidad de seguridad
esquemaUsuario.methods.generarHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};*/

/* Usando el modelo creamos el usuario */
var usuario = mongoose.model('usuario', esquemaUsuario);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = usuario;