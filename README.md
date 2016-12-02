#Instrucciones de uso
---
1. Colocar el terminal apuntando al directorio raíz del proyecto clonado de este repositorio.
2. Para iniciar mongodb con autentificacion(seguridad basica) —> mongod --dbpath ./db --auth
3. Para ejecutar la App escribir en el terminal -> npm start ó DEBUG=myapp:* npm start. En Windows set DEBUG=myapp:* & npm start.	
La App usa la base de datos saboteurDB y sus credenciales son -u saboteurApp -p 3,14016pi usando cifrado SCRAM-SHA-1
