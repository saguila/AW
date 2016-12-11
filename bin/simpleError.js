module.exports = {
  muestraError: function(response,text,redireccion,htmlCode){
    response.writeHeader(htmlCode, {"Content-Type": "text/html", });
    response.write("<html><body><script>alert('" + text + "');window.location.href='" + redireccion +"';</script></body></html>");
    response.end();
  }
}
