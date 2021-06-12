function showLinks(evt, contents) {
    var linksObj = document.getElementById('weblinks');
    linksObj.className = window.event.srcElement.className;
    linksObj.innerHTML = contents;

}

function controlExpand(evt) {
  var sup = (document.all) ? window.event.srcElement : evt.target;
  if (sup == "[object Text]") {
      sup = sup.parentNode;
  }
  sup = sup.id;
  //var sup = window.event.srcElement.id;
  if (sup != '') {
    var sub = (document.all) ? document.all[(sup+"sub")] : document.getElementById(sup+"sub");
    //var sub= document.all[(sup + "sub")];
    if (sub != null) {
      if (sub.style.display == 'none') {
        sub.style.display = '';
      } else {
        sub.style.display = 'none';
      }
    }
  }
}

function closeSection(id_name) {
  sub = (document.all) ? document.all[id_name] : document.getElementById(id_name);
  sub.style.display = 'none';
}

function imageOn(oldImage,newImage) {
  if (document.images) {
    document.images[oldImage].src=eval(newImage + ".src");
  }
}

function makeArray(len) {
  for (var i= 0; i < len; i++) this[i] = null;
  this.length = len;
}

function timeSet() {
  var time = new Date();
  var hours = time.getHours();
  var mins = time.getMinutes();
  var hourTens = hours / 10;
  hourTens = Math.floor(hourTens);
  var hourOnes = hours % 10;
  var minTens = mins /10;
  minTens = Math.floor(minTens);
  var minOnes = mins % 10;

  document.images["hTens"].src = digit[hourTens].src;
  document.images["hOnes"].src = digit[hourOnes].src;
  document.images["mTens"].src = digit[minTens].src;
  document.images["mOnes"].src = digit[minOnes].src;
  timerID = setTimeout("timeSet()", 60000);
}

function showComments(n,title) {
      window.open('showComments.php?commentNo=' + n + '&title=' + title, 'comments' ,
              'directories=0,height=480,location=0,resizable=1,scrollbars=1,toolbar=0,width=515');
}

