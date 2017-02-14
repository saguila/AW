/* Javascript para ayudar al script-shell createBD a crear los datos de la BD */
// Insertando usuarios
db.createUser({user:"admin",pwd:"admin",roles:[{role:"root",db:"admin"}]});
use saboteurDB;
db.createUser({user:"saboteurApp",pwd:"3,14016pi",roles:[{role:"dbOwner",db:"saboteurDB"}]});
db.test.insert({prueba:"OK"});

// Insertando las cartas
db.carta.insert({_id:NumberInt(0),foto:'/images/T0.png'});
db.carta.insert({_id:NumberInt(1),salidas:[false,false,true,false],foto:'/images/T1.png'});
db.carta.insert({_id:NumberInt(2),salidas:[false,true,false,false],foto:'/images/T2.png'});
db.carta.insert({_id:NumberInt(3),salidas:[false,true,true,false],foto:'/images/T3.png'});
db.carta.insert({_id:NumberInt(4),salidas:[true,false,false,false],foto:'/images/T4.png'});
db.carta.insert({_id:NumberInt(5),salidas:[true,false,true,false],foto:'/images/T5.png'});
db.carta.insert({_id:NumberInt(6),salidas:[true,true,false,false],foto:'/images/T6.png'});
db.carta.insert({_id:NumberInt(7),salidas:[true,true,true,false],foto:'/images/T7.png'});
db.carta.insert({_id:NumberInt(8),salidas:[false,false,false,true],foto:'/images/T8.png'});
db.carta.insert({_id:NumberInt(9),salidas:[false,false,true,true],foto:'/images/T9.png'});
db.carta.insert({_id:NumberInt(10),salidas:[false,true,false,true],foto:'/images/T10.png'});
db.carta.insert({_id:NumberInt(11),salidas:[false,true,true,true],foto:'/images/T11.png'});
db.carta.insert({_id:NumberInt(12),salidas:[true,false,false,true],foto:'/images/T12.png'});
db.carta.insert({_id:NumberInt(13),salidas:[true,false,true,true],foto:'/images/T13.png'});
db.carta.insert({_id:NumberInt(14),salidas:[true,true,false,true],foto:'/images/T14.png'});
db.carta.insert({_id:NumberInt(15),salidas:[true,true,true,true],foto:'/images/T15.png'});
db.carta.insert({_id:NumberInt(16),foto:'/images/PicoRoto.png'});
db.carta.insert({_id:NumberInt(17),foto:'/images/PicoArreglado.png'});
db.carta.insert({_id:NumberInt(18),foto:'/images/Lupa.png'});
db.carta.insert({_id:NumberInt(19),foto:'/images/Bomba.png'});
db.carta.insert({_id:NumberInt(20),salidas:[true,true,true,true],foto:'/images/DNK.png'});
db.carta.insert({_id:NumberInt(21),salidas:[true,true,true,true],foto:'/images/Start.png'});
db.carta.insert({_id:NumberInt(22),salidas:[true,true,true,true],foto:'/images/NoGold.png'});
db.carta.insert({_id:NumberInt(23),salidas:[true,true,true,true],foto:'/images/Gold.png'});