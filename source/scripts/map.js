function showLayers(ns_evt,id_name) { //v1.2
  var theObj;
  if (document.layers != null) {
    theObj = document.layers[id_name+'f'];
    if (theObj) {
      theObj.visibility = 'show';
      theObj.top = ns_evt.pageY;
      theObj.left = ns_evt.pageX;
    }
  } else if (document.all != null) { //IE
    theObj = document.all[window.event.srcElement.id+'f'];
    if (theObj) {
      theObj.style.visibility = 'visible';
      theObj.style.top = window.event.y;
      theObj.style.left = window.event.x;
    }
  } else {
    theObj = document.getElementById(ns_evt.target.id+'f');
    if (theObj) {
      theObj.style.visibility = 'visible';
      //alert(ns_evt.x+' '+ns_evt.x);
      theObj.style.top = ns_evt.pageY;
      theObj.style.left = ns_evt.pageX;
    }
  }
}

function hideLayers(ns_evt,id_name) { //v1.2
  var theObj;
  if (document.layers != null) {
    theObj = document.layers[id_name+'f'];
    if (theObj) {
      theObj.visibility = 'hide';
      theObj.top = ns_evt.pageY;
      theObj.left = ns_evt.pageX;
    }
  } else if (document.all != null) { //IE
    theObj = document.all[window.event.srcElement.id+'f'];
    if (theObj) {
      theObj.style.visibility = 'hidden';
      theObj.style.top = window.event.y;
      theObj.style.left = window.event.x;
    }
  } else {
    theObj = document.getElementById(ns_evt.target.id+'f');
    if (theObj) {
      theObj.style.visibility = 'hidden';
      //alert(ns_evt.x+' '+ns_evt.x);
      theObj.style.top = ns_evt.pageY;
      theObj.style.left = ns_evt.pageX;
    }
  }
}
