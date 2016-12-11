/* Javascript para ayudar al script-shell createBD a crear los usuarios */
db.createUser({user:"admin",pwd:"admin",roles:[{role:"root",db:"admin"}]});
use saboteurDB;
db.createUser({user:"saboteurApp",pwd:"3,14016pi",roles:[{role:"dbOwner",db:"saboteurDB"}]});
db.test.insert({prueba:"OK"});
