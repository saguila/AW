/* Java Scripts con el manejo de sesiones */

var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

/* El manejo de sessiones es Lazy solo se guardan al modificarse el objeto session */
module.exports = session({
	saveUninitialized: false, // No guardar la sesion mientras que no se añada algo al objecto session.
	resave: false, // No guardar la sesion a  menos que se modifique.
    secret:'prueba',
    unset: 'destroy', // Si session=null se destruye de la BD.
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: false, //no guardar la session en la BD a menos que se añada algo a session.
    store: new mongoStore({
        url: URL_DB,
        autoRemove: 'interval',
    	autoRemoveInterval: 10 // In minutes. Default
    })
})

/* module exports devuelve el objecto al que se iguala, para recogerlo llamarlo desde fuera --> var x = require('/bin/sesiones') 
-- Nota no hace falta poner .js*/