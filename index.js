var Plotly = require('./plotly');
var Redux = require('redux');
var ReactDOM = require('react-dom');
var React = require('react');



//actions
function search(city){
  return {
    type: 'search',
    city: city
  }
}

//reducers
var initialState = {
  val:[],
  lab:[],
}

function reducer(state, action){
  if(state === undefined){
    return initialState
  } else if(action.type === 'search'){
    var newCity = [action.city];
    var coders = [1];
    return {
      val: state.val.concat(coders),
      lab: state.lab.concat(newCity)
    }
  }
  return state
}

//components
var Application = React.createClass({
  render: function(){
    return(
      <div>
        <Search/>
        <PlotlyComponent store={this.props.store}/>
      </div>
    );
  }
})

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
     <input ref={function(node){this.input = node;}}></input>
     <button onClick={function(){
        store.dispatch(search(this.input.value));
        input.value = '';
        console.log(store.getState());
      }}></button>
     </div>
   );
 }
});

var PlotlyComponent = React.createClass({
    shouldComponentUpdate: function() {
      return true;
    },

    componentDidUpdate: function() {
      var data = [{
      values: this.props.store.val, 
      labels: this.props.store.lab,
      type: 'pie'}];

      var layout = {
      height: 400,
      width: 400
      };

      Plotly.newPlot('chart', data, layout);  
      console.log(data);
    },

  	render: function(){  	
		return <div />;
  	}
});


//store
var store = Redux.createStore(reducer);
var render = function(){
  ReactDOM.render(
  <Application store = {store.getState()}/>,
  document.getElementById('search')
  );
}
store.subscribe(render);
render();

