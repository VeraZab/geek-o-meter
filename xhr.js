var url = 'https://api.github.com/search/users?q=type:user+location:"'+city+'"';
var xhr = new XMLHttpRequest();
xhr.open('GET', action.url);
xhr.send();
var newCity = [action.city];
var coders = [JSON.parse(xhr.responseText).total_count];