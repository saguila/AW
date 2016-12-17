
module.exports = {
  noAutentificado :function (req,res,next){
  	if (!req.session.usuario) {
  		next();
  	}
  	else{
  		res.status(403);
  		res.redirect('/');
  	}
  }
,
autentificacionRequerida: function (req,res,next){
  	if (req.session.usuario) {
  		next();
  	}
  	else{
  		res.status(403);
  		res.redirect('/');
  	}
  }
}
