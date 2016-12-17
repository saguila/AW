"use strict";

module.exports = {
    DB:{
        uri:'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB',
        user: "saboteurApp",
        password: "3,14016pi",
        host: "localhost",
        port:3001,
        options:{
            db: { native_parser: true },
            server: { poolSize: 5 },
            replset: { rs_name: 'saboteurRS' },
            user: 'saboteurApp',
            pass: '3,14016pi'
        }
    },
    portApp: 3000
};
