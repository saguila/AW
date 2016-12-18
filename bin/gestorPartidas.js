var _partida = require('../models/partida');

function generadorDeElementos(numeroJugadores){
  // Calculamos numero turnos y roles
  var nTurnos;
  var rolesDisponibles;
  if(numeroJugadores === 3){
    nTurnos = 50;
    rolesDisponibles = ['Saboteador','Buscador','Buscador'];
  }
  else if(numeroJugadores === 4){
    nTurnos = 45;
    rolesDisponibles = ['Saboteador','Buscador','Buscador','Buscador'];
  }
  else if(numeroJugadores == 5){
    nTurnos = 40;
    rolesDisponibles = ['Saboteador','Saboteador','Buscador','Buscador','Buscador'];
  }
  else if(numeroJugadores == 6){
    nTurnos = 40;
    rolesDisponibles = ['Saboteador','Saboteador','Buscador','Buscador','Buscador','Buscador'];
  }
  else {
    nTurnos = 35;
    rolesDisponibles = ['Saboteador','Saboteador','Buscador','Buscador','Buscador','Buscador'];
  }

  // Calculamos numero de Cartas
  var nCartas;
  if(numeroJugadores <= 5){
    nCartas = 6;
  }
  else nCartas = 5;
  // Calculamos la posicion del Oro
  var posOro = [41,27,13][Math.floor(Math.random() * 3)];
  // Generamos el array de Cartas
  var manos = [];
  var cartas = [];
  for(i = 0; i < numeroJugadores;i++){
    cartas = [];
    for(j = 0; j < nCartas; j++){
      cartas.push((Math.floor(Math.random() * 16)+1));
    }
    manos.push(cartas);
  }
  // el primer turno es para
  var posPrimerTurno = Math.floor(Math.random() * numeroJugadores);
  // Asignar a cada jugador por poscion un rol
  var rolesAsignados = [];
  var elem;
    for(i = numeroJugadores; i != 1; i--){
      elem = Math.floor(Math.random() * i);
      rolesAsignados.push(rolesDisponibles[elem]);
      rolesDisponibles.slice(elem);
    }
    rolesAsignados.push(rolesDisponibles[0]);
  return {nturnos:nTurnos,rolesasignados:rolesAsignados,posoro:posOro,primerturno:posPrimerTurno,cartasiniciales:manos};
}


function guardarMano(idPartida,nick,mano,juego,callback){
  var _mano = require('../models/mano');
  var nuevaMano = new _mano({
    partida:idPartida,
    usuario:nick,
    juego:juego,
    cartas:mano
  });
nuevaMano.save(function(err,result){
  callback(null,result);
});
}


module.exports = {

iniciaPartida : function (idPartida,callback){
  _partida.findById(idPartida,function (err,partida) {
     var generador = generadorDeElementos(partida.numeroJugadores());
     partida.estado = 'Activa';
     partida.localizacionOro = generador.posoro;
     partida.turnoPara = partida.jugadores[generador.primerturno];
     partida.turnosRestantes = generador.nturnos;
     partida.fecha = Date.now();
     partida.tablero = [0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,21,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0];
     //Generar manos
     generador.cartasiniciales.forEach(function(v,i){
       guardarMano(idPartida,partida.jugadores[i],v,generador.rolesasignados[i],function (err,result){
         partida.manos.push(result);
       });
     });
     partida.save(function(err,result){
       callback(null,result)
     });
  });
}
}
