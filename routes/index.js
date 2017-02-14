var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.session.usuario) { // Se podria usar el modulo de comprobaciones pero por no liar a nadie no lo pongo.
        res.render('index');
    }
    else{
        require('../bin/mongooseResuts').consultaIndex(req.session.usuario.nick,function (err,result) {
            if(typeof (result.finalizadas) != 'undefined') {

            }
			res.render('index',{abiertas:result.abiertas,activas:result.activas,finalizadas:result.finalizadas});
        });
	}
});
module.exports = router;