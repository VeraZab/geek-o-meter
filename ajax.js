var plot = require('./plotly');
var data = [{ values: [], labels: [], type: 'pie' }];
var layout = { height: 400, width: 500 };


window.hello = function (input){
data[0].labels.push(input);

var url='https://api.github.com/search/users?q=type:user+location:"'+input+'"';
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function(){
	var text = JSON.parse(xhr.responseText);
	data[0].values.push(text.total_count);
}
xhr.send();

plot.newPlot('result', data, layout);
}