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
var esquemaMano = new Schema({
    partida: {type: Schema.ObjectId, ref:'partida'},
    usuario: {type: Schema.ObjectId, ref:'usuario'},
    juego: {type:String,enum:['Saboteador','Buscador']},
    cartas: [Number]
});

/* Usando el modelo creamos el mano */
var mano = mongoose.model('mano', esquemaComentario);

/* Devolvemos el modelo para que pueda ser mano */
module.exports = mano;
