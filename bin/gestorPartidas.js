var _partida = require('../models/partida');

function darCarta(){
    return Math.floor(Math.random() * 20) + 1;
}

function descartar(partida,posUsuario,posCarta){
    if(posCarta > -1 && posCarta <  partida.jugadores[posUsuario].mano.length){
        partida.jugadores[posUsuario].mano.splice(posCarta,1);
        finalTurno(partida,posUsuario);
        return true;
    }
    else return false;
}

/* Si se han agotado los turnos */
function finTurnos(partida){
    partida.turnosRestantes = 0;
    partida.turnoPara = 'Finalizada';
    partida.ganadores = 'Saboteador';
    partida.estado = 'Finalizada';
    guardarPartida(partida,function (err,result) {
        if(err) console.log(err);
    });
}

/* Se ha encontrado el oro */
function oroEncontrado(partida,pos){
    partida.tablero[pos] = 23;
    partida.turnoPara = 'Finalizada';
    partida.ganadores = 'Buscador';
    partida.estado = 'Finalizada';
    guardarPartida(partida,function (err,result) {
        if(err) console.log(err);
    });
}

function finalTurno(partida,posUsuario){
    partida.fecha = Date.now();
    if(partida.turnosRestantes > 0) {
        if (posUsuario + 1 == partida.jugadores.length) {
            partida.turnoPara = partida.jugadores[0].nombre;
        }
        else {
            partida.turnoPara = partida.jugadores[posUsuario + 1].nombre;
        }
        if(partida.turnosRestantes == 1){
            finTurnos(partida);
        }
        else{
            partida.jugadores[posUsuario].mano.push(darCarta());
            partida.turnosRestantes -=1;
            guardarPartida(partida,function (err,result) {
                if(err) console.log(err);
            });
        }
    }
}


function colocarFicha(posUsuario,posCarta,partida,posicion){
        var carta = cartas(partida.jugadores[posUsuario].mano[posCarta]);
        var camArriba = carta.salidas[0];
        var camDer = carta.salidas[1];
        var camAbajo = carta.salidas[2];
        var camIzq = carta.salidas[3];
        var Cabajo,Cder,Cizq,Carriba,resAr,resD,resAb,resI;
        var encaja = false;
        var saleDeUnaCasilla = false;
        //miramos si esta arriba
        if(posicion < 7){
            if(posicion % 7 == 0){ //Estamos en la esquina superior izquierda
                //revisamos derecha y abajo
                 Cabajo = cartas(partida.tablero[posicion + 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);

                 saleDeUnaCasilla = (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21));
                resAb = (Cabajo.identificador == 0 ||(camAbajo == Cabajo.salidas[0]));
                resD = (Cder.identificador == 0 ||(camDer == Cder.salidas[3]));
                encaja = saleDeUnaCasilla && resAb && resD;

            }
            else if(posicion % 7 == 6){ //Estamos en la esquina superior derecha
                // revisamos abajo e izquierda
                 Cabajo = cartas(partida.tablero[posicion + 7]);
                 Cizq = cartas(partida.tablero[posicion - 1]);

                 saleDeUnaCasilla = (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21));

                resAb = (Cabajo.identificador == 0 || (camAbajo == Cabajo.salidas[0]));
                resI = (Cizq.identificador == 0 || (camIzq == Cizq.salidas[1]));

                encaja = saleDeUnaCasilla && resAb && resI;
            }
            else{ // Estamos entre medias
                //revisamos izquierda derecha y abajo
                 Cabajo = cartas(partida.tablero[posicion + 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);
                 Cizq = cartas(partida.tablero[posicion - 1]);

                 saleDeUnaCasilla = (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21));

                resAb = (Cabajo.identificador == 0 || (camAbajo == Cabajo.salidas[0]));
                resD = (Cder.identificador == 0 || (camDer == Cder.salidas[3]) && (camIzq == Cizq.salidas[1]));

                encaja = saleDeUnaCasilla && resAb && resD;
            }
        }
        else if(posicion > 41){ //Estamos abajo
            if(posicion % 7 == 0) { //Estamos en la esquina inferior izquierda
                //revisamos derecha y arriba
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21));

                resAr = (Carriba.identificador == 0 || (camArriba == Carriba.salidas[2]));
                resD = (Cder.identificador == 0 || (camDer == Cder.salidas[3]));

                encaja = saleDeUnaCasilla && resAr && resD;


            }
            else if(posicion % 7 == 6){ //Estamos en la esquina superior derecha
                // revisamos arriba e izquierda
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cizq = cartas(partida.tablero[posicion - 1]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21));

                resAr = (Carriba.identificador == 0 || (camArriba == Carriba.salidas[2]));
                resI = (Cizq.identificador == 0 || (camIzq == Cizq.salidas[1]));

                encaja = saleDeUnaCasilla && resAr && resI;

            }
            else{ // Estamos entre medias
                //revisamos izquierda derecha y arriba
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);
                 Cizq = cartas(partida.tablero[posicion - 1]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21));

                resAr = (Carriba.identificador == 0 ||(camArriba == Carriba.salidas[2]));
                resD = (Cder.identificador == 0 ||(camDer == Cder.salidas[3]));
                resI = (Cizq.identificador == 0 ||(camIzq == Cizq.salidas[1]));

                encaja = saleDeUnaCasilla && resAr && resD && resI;

            }
        }
        else{ //la posicion esta intermedia
            if(posicion % 7 == 0){ //Estamos en la esquina inferior izquierda
                //revisamos derecha y arriba
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cabajo = cartas(partida.tablero[posicion + 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21));

                resAb = (Cabajo.identificador == 0 || (camAbajo == Cabajo.salidas[0]));
                resAr =(Carriba.identificador == 0 ||(camArriba == Carriba.salidas[2]));
                resD = (Cder.identificador == 0 || (camIzq == Cder.salidas[1]));

                encaja = saleDeUnaCasilla && resAb && resAr && resD;

            }
            else if(posicion % 7 == 6){ //Estamos en la esquina superior derecha
                // revisamos arriba e izquierda
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cizq = cartas(partida.tablero[posicion - 1]);
                 Cabajo = cartas(partida.tablero[posicion + 7]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21));

                resAb = (Cabajo.identificador == 0 || (camAbajo == Cabajo.salidas[0]));
                resAr = (Carriba.identificador == 0 ||(camArriba == Carriba.salidas[2]));
                resI = (Cizq.identificador == 0 || (camIzq == Cizq.salidas[1]));

                encaja = saleDeUnaCasilla && resAb && resAr && resI;

            }
            else{ // Estamos entre medias
                //revisamos izquierda derecha y arriba
                 Carriba = cartas(partida.tablero[posicion - 7]);
                 Cder = cartas(partida.tablero[posicion + 1]);
                 Cizq = cartas(partida.tablero[posicion - 1]);
                 Cabajo = cartas(partida.tablero[posicion + 7]);

                 saleDeUnaCasilla = (((Carriba.identificador > 0  && Carriba.identificador < 16) || Carriba.identificador == 21)) ||
                    (((Cabajo.identificador > 0  && Cabajo.identificador < 16) || Cabajo.identificador == 21)) ||
                    (((Cizq.identificador > 0  && Cizq.identificador < 16) || Cizq.identificador == 21)) ||
                    (((Cder.identificador > 0  && Cder.identificador < 16) || Cder.identificador == 21));

                resAb = (Cabajo.identificador == 0 ||(camAbajo == Cabajo.salidas[0]));
                resAr = (Carriba.identificador == 0 ||(camArriba == Carriba.salidas[2]));
                resI = (Cizq.identificador == 0 || (camIzq == Cizq.salidas[1]));
                resD = (Cder.identificador == 0 ||(camDer == Cder.salidas[3]));

                encaja = saleDeUnaCasilla && resAb && resAr && resI && resD;

            }
        }
        if(encaja){
            //Colocamos la ficha en el tablero
            partida.tablero[posicion] = carta.identificador;
            // Quitamos la carta del usuario
            partida.jugadores[posUsuario].mano.splice(posCarta,1);
            partida.markModified('tablero'); //Marcamos como que  hemos modificado el tablero
        // Ver si nos hemos topado con una posicion
            if(posicion + 1 == 13 || posicion - 1 == 13 || posicion -7 == 13 || posicion + 7 == 13){ //Nos topamos con el 14
                if(partida.localizacionOro == 13){
                    oroEncontrado(partida,13);
                }
                else{
                    partida.tablero[13] = 22;
                    // Pasamos el turno
                    finalTurno(partida,posUsuario);
                }
            }
            else if(posicion + 1 == 27 || posicion - 1 == 27 || posicion -7 == 27 || posicion + 7 == 27){ //No topamos con el 28
                if(partida.localizacionOro == 27){
                    oroEncontrado(partida,27);
                }
                else{
                    partida.tablero[27] = 22;
                    // Pasamos el turno
                    finalTurno(partida,posUsuario);
                }
            }
            else if(posicion + 1 == 41 || posicion - 1 == 41 || posicion -7 == 41 || posicion + 7 == 41){ // Nos encontramos con el
                if(partida.localizacionOro == 41){
                    oroEncontrado(partida,41);
                }
                else{
                    partida.tablero[41] = 22;
                    // Pasamos el turno
                    finalTurno(partida,posUsuario);
                }
            }
            else{//No hay oro por ningun lado
                finalTurno(partida,posUsuario);
            }
        }
        console.log({adyacentes:{arriba:Carriba,derecha:Cder,abajo:Cabajo,izquierda:Cizq},micarta:{arriba:camArriba,derecha:camDer,abajo:camAbajo,izquierda:camIzq}});
        console.log({arriba:resAr,derecha:resD,abajo:resAb,izquierda:resI,haycasilla:saleDeUnaCasilla});
    return encaja;
}

function guardarPartida(partida,callback){
    partida.save(function(err,result){
        callback(null,result);
    });
}

function cartas(id){
    var salida;
if(id == 0)
salida = {identificador:0,foto:'/images/T0.png'};
else if(id == 1)
    salida = {identificador:1,salidas:[false,false,true,false],foto:'/images/T1.png'};
else if(id == 2)
    salida = {identificador:2,salidas:[false,true,false,false],foto:'/images/T2.png'};
else if(id == 3)
    salida = {identificador:3,salidas:[false,true,true,false],foto:'/images/T3.png'};
else if(id == 4)
    salida = {identificador:4,salidas:[true,false,false,false],foto:'/images/T4.png'};
else if(id == 5)
    salida = {identificador:5,salidas:[true,false,true,false],foto:'/images/T5.png'};
else if(id == 6)
    salida = {identificador:6,salidas:[true,true,false,false],foto:'/images/T6.png'};
else if(id == 7)
    salida = {identificador:7,salidas:[true,true,true,false],foto:'/images/T7.png'};
else if(id == 8)
    salida = {identificador:8,salidas:[false,false,false,true],foto:'/images/T8.png'};
else if(id == 9)
    salida = {identificador:9,salidas:[false,false,true,true],foto:'/images/T9.png'};
else if(id == 10)
    salida = {identificador:10,salidas:[false,true,false,true],foto:'/images/T10.png'};
else if(id == 11)
    salida = {identificador:11,salidas:[false,true,true,true],foto:'/images/T11.png'};
else if(id == 12)
    salida = {identificador:12,salidas:[true,false,false,true],foto:'/images/T12.png'};
else if(id == 13)
    salida = {identificador:13,salidas:[true,false,true,true],foto:'/images/T13.png'};
else if(id == 14)
    salida = {identificador:14,salidas:[true,true,false,true],foto:'/images/T14.png'};
else if(id == 15)
    salida = {identificador:15,salidas:[true,true,true,true],foto:'/images/T15.png'};
else if(id == 16)
    salida = {identificador:16,foto:'/images/PicoRoto.png'};
else if(id == 17)
    salida = {identificador:17,foto:'/images/PicoArreglado.png'};
else if(id == 18)
    salida = {identificador:18,foto:'/images/Lupa.png'};
else if(id == 19)
    salida = {identificador:19,foto:'/images/Bomba.png'};
else if(id == 20)
    salida = {identificador:20,salidas:[true,true,true,true],foto:'/images/DNK.png'};
else if(id == 21)
    salida = {identificador:21,salidas:[true,true,true,true],foto:'/images/Start.png'};
else if(id == 22)
    salida = {identificador:22,salidas:[true,true,true,true],foto:'/images/NoGold.png'};
else if(id == 23)
    salida = {identificador:23,salidas:[true,true,true,true],foto:'/images/Gold.png'};

return salida;
}


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
      cartas.push((Math.floor(Math.random() * 20)+1));
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
      rolesDisponibles.splice(elem,1);
    }
    rolesAsignados.push(rolesDisponibles[0]);
  return {nturnos:nTurnos,rolesasignados:rolesAsignados,posoro:posOro,primerturno:posPrimerTurno,cartasiniciales:manos};
}

function rangoCasillas(posicion){
 return posicion >-1 && posicion < 49;
}


module.exports = {

iniciaPartida : function (idPartida,callback){
  _partida.findById(idPartida,function (err,partida) {
     var generador = generadorDeElementos(partida.numeroJugadores());
     partida.estado = 'Activa';
     partida.localizacionOro = generador.posoro;
     partida.turnoPara = partida.jugadores[generador.primerturno].nombre;
     partida.turnosRestantes = generador.nturnos;
     partida.fecha = Date.now();
     partida.tablero = [0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,21,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0];
     for(i = 0 ; i < partida.jugadores.length;i++){
      partida.jugadores[i].pico = 'OK';
      partida.jugadores[i].juego = generador.rolesasignados[i];
      partida.jugadores[i].mano = generador.cartasiniciales[i];
     }
     partida.save(function(err,result){
      callback(null,result);
      });
  });
},
    devolverFoto : function (idCarta) {
    return cartas(idCarta).foto;
    },
    jugarCarta: function(idPartida,posCarta,jugador,posicion,opcion,callback){

        _partida.findById(idPartida,function (err,partida){
            if(err) callback('bd');
            else{
                var posUsuario = partida.posUsuario(jugador);
                if(posUsuario == -1) callback('No se encuentra el usuario'); //Si no se encutra el usuario
                var idCarta = partida.jugadores[posUsuario].mano[posCarta];
                if(opcion == 'descartar'){
                    if(descartar(partida,posUsuario,posCarta)){
                        callback(null,partida); //La operacion se realizo correctamente
                    }
                    else{
                        callback('Posicion de la carta invalida'); //La operacion fallo.
                    }
                }
                else{
                    var carta = cartas(idCarta);
                    if(carta.identificador > 1 && carta.identificador < 16 && rangoCasillas(posicion)){ //Metemos Cartas de caminos
                        if(partida.jugadores[posUsuario].pico == 'OK'){
                            if(partida.tablero[posicion] == 0){
                                if(colocarFicha(posUsuario,posCarta,partida,posicion)){
                                    callback(null);
                                }
                                else{
                                    callback('No se ha podido colocar la carta');
                                }
                            }
                            else{
                                callback('Ya ha una ficha en esa posicion')
                            }
                        }
                        else{
                            callback('No puedes Hacer caminos tienes el pico roto');
                        }
                    }
                    else if(carta.identificador == 16 && partida.posUsuario(opcion) > -1){ //Pico Roto Que se halla marcado usuario
                    var posTarget = partida.posUsuario(opcion);
                    if(posTarget > -1 && partida.jugadores[posTarget].pico != 'BRK'){
                        partida.jugadores[posTarget].pico = 'BRK';
                        //Quitamos la carta del usuario
                        partida.jugadores[posUsuario].mano.splice(posCarta,1);
                        // Pasamos el turno
                        finalTurno(partida,posUsuario);
                        callback(null);
                    }
                    else{ //No ha seleccionado un usuario valido
                        callback('Sin Objetivo valido');
                    }
                    }
                    else if(carta.identificador == 17 && partida.posUsuario(opcion) > -1){ //Pico Arreglado Que se halla marcado usuario
                        var posTarget = partida.posUsuario(opcion);
                        if(posTarget > -1 && partida.jugadores[posTarget].pico != 'OK'){
                            partida.jugadores[posTarget].pico = 'OK';
                            //Quitamos la carta del usuario
                            partida.jugadores[posUsuario].mano.splice(posCarta,1);
                            // Pasamos el turno
                            finalTurno(partida,posUsuario);
                            callback(null);
                        }
                        else{ //No ha seleccionado un usuario valido
                            callback('Sin Objetivo valido');
                        }
                    }
                    else if(carta.identificador == 18 && rangoCasillas(posicion)){ //Lupa rango valido de casillas
                        if(partida.tablero[posicion] == 20){ //Que sean casillas incognitas
                            if(posicion == partida.localizacionOro){
                                partida.tablero[posicion] = 23;
                            }
                            else{
                                partida.tablero[posicion] = 22;
                            }
                            //Quitamos la carta del usuario
                            partida.jugadores[posUsuario].mano.splice(posCarta,1);
                            // Pasamos el turno
                            partida.markModified('tablero');
                            finalTurno(partida,posUsuario);
                            callback(null); //Volvemos
                        }

                    }
                    else if(carta.identificador == 19 && rangoCasillas(posicion)){ //Bomba
                        if(partida.tablero[posicion] > 1 && partida.tablero[posicion] < 16){ //Que sean caminos
                            partida.tablero[posicion] = 0; //Ponemos una casilla sin nada
                            //Quitamos la carta del usuario
                            partida.jugadores[posUsuario].mano.splice(posCarta,1);
                            // Pasamos el turno
                            partida.markModified('tablero'); //Marcamos como que hemos modificado el tablero
                            finalTurno(partida,posUsuario);
                            callback(null);
                        }
                        else{
                            callback('Has seleccionado una casilla que no es un camino')
                        }
                    }
                    else{
                        callback('Error en la entrada');
                    }
                }
            }
        });
    },

}
