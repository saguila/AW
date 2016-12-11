#Instrucciones de uso
---
1. Colocar el terminal apuntando al directorio raíz del proyecto clonado de este repositorio.
2. $ **sh createDB** y esperar un pequeño rato hasta que acabe,tiene que bajar los modulos y preparar y generar la BD
3. $ **sh start** Para arrancar el servidor y la base de datos,para cerrar Cntrl + C

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
