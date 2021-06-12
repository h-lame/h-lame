var goodEye = new Image(320,240);
goodEye.src = "/images/goodeye.jpg";

var evilEye = new Image(320,240);
evilEye.src = "/images/evileye.jpg";

function imgSwap(id,newImgSrc) {
  var img = document.images[id];
  if (img != null) {
    img.src = newImgSrc;
  }
}

function doFlicker(start,flicker) {
  setTimeout("evil()",start);
  setTimeout("good()",start+flicker);
  setTimeout("doFlicker("+(Math.random()*5000)+","+(Math.random()*500)+")",start+flicker+1);
}

function beginEvilEye() {
  setTimeout("doFlicker(1,100)",1);
  var img = document.images['sightBeyondSight'];
  img.attachEvent('onmouseover',evil);
  img.attachEvent('onmouseout',good);
}

function evil() {
  imgSwap('sightBeyondSight',evilEye.src);
}

function good() {
  imgSwap('sightBeyondSight',goodEye.src);
}
