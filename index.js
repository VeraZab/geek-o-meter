const Plotly = require('./plotly')
const ReactDOM = require('react-dom')
const React = require('react')
const Thunk = require('redux-thunk')
const Redux = require('redux')

const compose = (f, g) => x => f(g(x))

// actions
const dataRequest = xhr => city =>
  (xhr.open(
    'GET',
    `https://api.github.com/search/users?q=type:user+location:"${city}"`,
    false
  ), xhr.send(), [city, xhr.responseText])

const parseResponse = compose(
  ([city, json]) => [city, json.total_count],
  ([city, raw]) => [city, JSON.parse(raw)]
)

const makeGithubRequest = compose(parseResponse, dataRequest(new XMLHttpRequest()))

const createModel = ([city, users]) => ({
  type: 'GITHUB_RESPONSE',
  city,
  users
})

const githubResponse = compose(createModel, makeGithubRequest)

const start = city => dispatch => dispatch(githubResponse(city))

//reducers
const initialState = {
  val: [],
  lab: []
}

const reducer = (state, action) =>
  action.type === 'GITHUB_RESPONSE'
    ? {
        lab: state.lab.concat([action.city]),
        val: state.val.concat([action.users])
      }
    : state || initialState

//components
const PlotlyComponent = React.createClass({
  shouldComponentUpdate: props =>
    Plotly.newPlot(
      'chart',
      [
        {
          values: props.store.val,
          labels: props.store.lab,
          type: 'pie'
        }],
      {
        height: 400,
        width: 400
      }),

  render: () => <div />
})

const Application = props => (
  <div>
    <Search />
    <PlotlyComponent store={props.store} />
    <Source />
  </div>
)

const Search = () => <InputField />

const add = e => e.keyCode === 13 && (store.dispatch(start(e.target.value)), (e.target.value = ''))

const InputField = () => (
  <div>
    <input id="inputBox" onKeyDown={add} placeholder="enter city to compare geekiness quotient" />
    <span>*</span>
  </div>
)

const Source = () => (
  <div id="source">
    * stats based on
    {' '}
    <a href="https://github.com/">GitHub</a>
    {' '}
    API, showing number of individual account holders per city
  </div>
)

//store
const createStoreWithMiddleware = Redux.applyMiddleware(Thunk)(Redux.createStore)
const store = createStoreWithMiddleware(reducer)

const render = () =>
  ReactDOM.render(<Application store={store.getState()} />, document.getElementById('search'))

store.subscribe(render)

render()
