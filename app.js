var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var multerFactory = multer({ dest: "uploads"});
var sesion = require('./bin/sesiones'); // Clase creada para el manejo de sesiones.
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var consultas = require('./bin/consultasbd');
/*consultas.getAllArray('test',function(err,result){
  console.log(result);
});*/

consultas.mongooseClient(function(){

});
/*consultas.update('test',{name : "prueba"},{name:"SIUU!"},true,function(err,result) {
console.log(result);
});/*

/*
Borrar por id
var ObjectId = require('mongodb').ObjectId;
consultas.findOneAndDelete('test',{_id : new ObjectId("5844c1bb66794b10b05ca8bd")});
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
/*require('crypto').randomBytes(48, function(err, buffer) {
  console.log(buffer.toString('hex'))});*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(sesion); //añadimos el midleware para la gestion de sesiones.

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/mierda',function(req,res){
res.cookie("x",1, { maxAge: 86400000 } );
res.render(index);
});

app.get('/mierda2',function(req,res){
console.log(req.cookies.x);
res.render(index);
});
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
