// name - name of the cookie
// value - value of the cookie
// [expires] - expiration date of the cookie (defaults to end of current session)
// [path] - path for which the cookie is valid (defaults to path of calling document)
// [domain] - domain for which the cookie is valid (defaults to domain of calling document)
// [secure] - Boolean value indicating if the cookie transmission requires a secure transmission
// * an argument defaults when it is assigned null as a placeholder
// * a null placeholder is not required for trailing omitted arguments
function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

// name - name of the desired cookie
// * return string containing value of specified cookie or null if cookie does not exist
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

// name - name of the cookie
// [path] - path of the cookie (must be same as path used to create cookie)
// [domain] - domain of the cookie (must be same as domain used to create cookie)
// * path and domain default if assigned null or omitted if no explicit argument proceeds
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// date - any instance of the Date object
// * hand all instances of the Date object to this function for "repairs"
function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

// old version.
/*function showLinks(contents) {
    var linksObj = document.getElementById('linkChoices');
    linksObj.innerHTML = eval(contents);
    //alert(document.cookie);
    setCookie("h-lame-links",contents);
}*/
// new version.
function showLinks(contents) {
    var tab = document.getElementById('linkChoices').firstChild;
    while (tab) {
      if (tab.nodeName.toLowerCase() == 'ul') {
        tab.style.display = "none";
      }
      tab = tab.nextSibling;
    }
    obj = document.getElementById(contents);
    obj.style.display = "inline";
    //alert(document.cookie);
    setCookie("h-lame-links",contents);
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

