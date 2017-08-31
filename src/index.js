import React from 'react';
import ReactDOM from 'react-dom';
import { Actions as FarceActions, BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { Matcher, foundReducer, createMatchEnhancer, createConnectedRouter, createRender, resolver } from 'found';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import './index.css';
import App from './App';
import Home from './Home';
import Login from './Login';
import appReducer from './reducers';

const routeConfig = [
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      }
    ]
  }
];

const store = createStore(
  combineReducers({
    found: foundReducer,
    app: appReducer,
  }),
  compose(
    applyMiddleware(
      thunkMiddleware,
    ),
    createHistoryEnhancer({
      protocol: new BrowserProtocol(),
      middlewares: [queryMiddleware],
    }),
    createMatchEnhancer(
      new Matcher(routeConfig),
    ),
  ),
);

store.dispatch(FarceActions.init());

const renderError = ({ error }) => (
  <div>
    {error}
  </div>
);

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError,
  }),
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter resolver={resolver} />
  </Provider>,
  document.getElementById('root')
);
