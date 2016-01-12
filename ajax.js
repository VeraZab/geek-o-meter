var API = require('./API_response');

window.hello = function (){
  for(var x = 0; x<API.items.length; x++){
    console.log(API.items[x].url);  
  }
}






