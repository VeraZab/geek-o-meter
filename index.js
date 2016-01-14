var Plotly = require('./plotly');
var Redux = require('redux');
var ReactDOM = require('react-dom');
var React = require('react');



//actions

//reducers
var initialState = {
  val:[1],
  lab:[1],
  t:'pie',
  h: 400,
  w: 400
}

//store

//components

var Search = React.createClass({
 render: function(){
   return(
       <InputField/>
   );
 }
});

var InputField = React.createClass({
 render: function(){
   return(
     <div>
     <input></input>
     <button></button>
     </div>
   );
 }
});

var PlotlyComponent = React.createClass({
	  componentDidMount: function() {
      var data = [{
        values: initialState.val, 
        labels: initialState.lab,
        type: initialState.t}];

      var layout = {
        height: initialState.h,
        width: initialState.w
      };

    	Plotly.plot('chart', data, layout);
  	},

  	shouldComponentUpdate: function() {
    return true;
  	},

  	render: function(){  	
		return <div />;
  	}
});

ReactDOM.render(
	<Search/>,
	document.getElementById('search')
);

ReactDOM.render(
  <PlotlyComponent/>,
  document.getElementById('chart')
);







	





