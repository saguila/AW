function TurnosSegunJugadores(numeroJugadores){
  var nTurnos;
  if(numJugadores === 3){
    nTurnos = 50;
  }
  else if(numJugadores === 4){
    nTurnos = 45;
  }
  else if(numJugadores === 7){
    nTurnos = 35;
  }
  else{
    nTurnos = 40;
  }
  return nTurnos;
}

module.exports = {

}
