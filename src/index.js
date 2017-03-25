import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';
// import localForage from 'localforage';

import App from './components/App';
import Teams from './components/Teams';
import reducers from './redux/reducers';

import Home from './containers/Home';
import Player from './containers/Player';
import SavedPlayers from './containers/SavedPlayers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(),
  autoRehydrate(),
));

persistStore(store);

/**
 * TODO: Make /teams, /team/:teamId
 */
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/saved-players" component={SavedPlayers} />
        <Route path="/player/:playerId" component={Player} />
        <Route path="/teams" component={Teams} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
