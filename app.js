var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert'); // https://mongodb.github.io/node-mongodb-native/index.html
const URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
//var MongoStore

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
require('crypto').randomBytes(48, function(err, buffer) {
  console.log(buffer.toString('hex'))});
MongoClient.connect(URL_DB, function(err, db) {
  assert.equal(null, err);
  if (err) {
    throw err;
  }
  db.collection('test').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    db.close();
  });
});*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ini', index);
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
