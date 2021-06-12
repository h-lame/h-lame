function doListenTo() {
  setTimeout("showListenTo()",1000);
}

function showListenTo() {
  var listento = document.getElementById('listento');
  var scripty = document.createElement('script');
  scripty.src = 'http://images.listen-to.com/javascript.php/7/muz'
  scripty.type = 'text/javascript';
  listento.appendChild(scripty);
}
doListenTo();

