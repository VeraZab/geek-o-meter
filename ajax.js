var plot = require('./plotly');
var data = [{ values: [19, 26, 55], labels: ['Montreal', 'Toronto', 'Ottawa'], type: 'pie' }];
var layout = { height: 400, width: 500 };

window.hello = function (){
// 'https://api.github.com/search/users?q=location:"'+input+'"+type:user'
plot.newPlot('result', data, layout);
}