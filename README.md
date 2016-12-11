#Instrucciones de uso
---
1. Colocar el terminal apuntando al directorio raíz del proyecto clonado de este repositorio.
2. Para iniciar mongodb con autentificacion(seguridad basica) —> mongod --smallfiles --nojournal --dbpath ./db-linux --port 3001 --auth --replSet saboteurRS
 * Al primer arranque se tiene que instanciar replSet(vease el apartado de mongo) replSet es necesario para Mongoose.
3. Para ejecutar la App escribir en el terminal -> **npm start** ó **DEBUG=myapp:* npm start**. En Windows set DEBUG=myapp:* & npm start.
  * En linux tambien se puede ejecutar directamente el script start --> $ **sh start**

#Algo de MongoDB
---
1. Conectarse a la BD iniciada
  * sin seguridad --> $ **mongo**
  * con seguridad (--auth) 

2. Crear usuarios 
  * Admin --> db.createUser({user:"admin",pwd:"admin",roles:[{role:"root"}]});
  * Saboteur --> db.createUser({user:"saboteurApp",pwd:"admin",roles:[{role:"dbOwner",db:"saboteurDB"}]});
  
3. Instanciar replSet(__Necesario para que funcione la App__) __NOTA__:Solo al crear las BD
  1. Para mayor facilidad arrancar la BD sin seguridad --> $ **mongod --smallfiles --nojournal --dbpath ./db-linux --port 3001**
  2. Entrar en la BD --> $ **mongo**
  3. Cambiar a la BD admin --> (MongoPrompt)$ **use admin**
  4. Instanciar replSet --> (MongoPrompt)$ **rs.initiate()**
  5. Salir de mongo --> **Cntrl + C**
  
4. Como conectarse a la bd desde el terminal con autentificación (--auth)
* Admin --> $ **mongo -u admin -p admin --port 3001 ** --> volver a introducir la contraseña **admin**
* Saboteur -->$ **mongo -u saboteurApp -p 3,14016pi --port 3001 ** --> volver a introducir la contraseña **3,14016pi**
