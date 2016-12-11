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

/* Creamos un esquema para los partidas */
var esquemaPartidas = new Schema({
    creador: { type: String, required: true},
    nombre: String,
    jugadores: [{type:String,unique: true}],
    numJugadores: {type:Number,min:3,max:7},
    turnosRestantes: Number,
    turnoPara: String,
    tablero:{type:[Number],default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    manos : [{type:Schema.ObjectId,ref:'mano'}],
    comentarios:[{type:Schema.ObjectId,ref:'comentario'}],
    estado: {type:String,enum:['Abierta','Activa','Finalizada']},
    ganadores: {type:String,enum:['Saboteador','Buscador']}
});

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
