// var API = require('./API_response');
// console.log(API);

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {    
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

function search(city){
  var city = city;
  var url="https://api.github.com/search/users?q=location:"+city;
  var xhr = createCORSRequest('GET', url);
  xhr.onload = function(){
    var text = xhr.responseText;
    console.log(text);
  }
  xhr.send();
}






