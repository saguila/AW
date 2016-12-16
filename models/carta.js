var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'saboteurRS' },
    user: 'saboteurApp',
    pass: '3,14016pi'
}

var mongoose = require('mongoose');
mongoose.connect(URL_DB,options);
var Schema = mongoose.Schema;
var esquemaCarta = new Schema({
    identificador: {type :Number,unique:true},
    valores: {type: [Boolean],default:[false,false,false,false]},
    foto: String
});

/* Usando el modelo creamos el comentario */
var carta = mongoose.model('carta', esquemaCarta);

/* Devolvemos el modelo para que pueda ser usado */
module.exports = carta;