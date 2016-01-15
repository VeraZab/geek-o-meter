var Plotly = require('./plotly');
var ReactDOM = require('react-dom');
var React = require('react');
var Thunk = require('redux-thunk');
var Redux = require('redux');


// actions
function dataRequest(city){
  var url = 'https://api.github.com/search/users?q=type:user+location:"' + city+'"';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();   
  return xhr.responseText;
}

function parseResponse(response){
  return JSON.parse(response).total_count;
}

function makeGithubRequest(city){
  return parseResponse(dataRequest(city));
};

function githubResponse(city){
  return {
    type: 'GITHUB_RESPONSE',
    city: city,
    users: makeGithubRequest(city)
  }
}

function start(city){
  return function(dispatch){
    dispatch(githubResponse(city));
  }
}


//reducers
var initialState = {
  val:[],
  lab:[],
}

function reducer(state, action){
  if(state === undefined){
      return initialState;
  } else if(action.type === 'GITHUB_RESPONSE'){
    var newCity = [action.city];
    var users = [action.users];
      return {
        lab: state.lab.concat(newCity),
        val: state.val.concat(users)
      } 
  };
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
  add: function(e){
  if(e.keyCode == 13){
    var city = e.target.value;
    store.dispatch(start(city));
    e.target.value ='';
  }
  },
 render: function(){
   return(
     <div>
     <input onKeyDown={this.add}></input>
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
    },

  	render: function(){  	
		return <div />;
  	}
});


//store
var createStoreWithMiddleware = Redux.applyMiddleware(Thunk)(Redux.createStore);
var store = createStoreWithMiddleware(reducer);

var render = function(){
  ReactDOM.render(
  <Application store = {store.getState()}/>,
  document.getElementById('search')
  );
}
store.subscribe(render);
render();

