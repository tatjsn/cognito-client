import React from 'react';
import ReactDOM from 'react-dom';
import { Actions as FarceActions, BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { Matcher, foundReducer, createMatchEnhancer, createConnectedRouter, createRender, resolver } from 'found';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';

import './index.css';
import App from './App';
import Home from './Home';
import Login from './Login';

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
  }),
  compose(
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
