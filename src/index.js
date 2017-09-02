import React from 'react';
import ReactDOM from 'react-dom';
import { Actions as FarceActions, BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { Matcher, foundReducer, createMatchEnhancer, createConnectedRouter, createRender, resolver } from 'found';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';
import Home from './Home';
import Login from './Login';
import Echo from './Echo';
import appReducer from './reducers';
import { getUserInfo } from './cognito';
import { setUserInfo, setEcho } from './actions';
import getEcho from './services/echo';

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
      },
      {
        path: 'echo',
        Component: Echo,
        getData: ({ context }) => {
          getEcho()
            .then((echo) => {
              context.store.dispatch(setEcho(echo));
            })
            .catch((error) => {
              context.store.dispatch(setEcho({ error }));
            })
        },
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
    <ConnectedRouter resolver={resolver} matchContext={{ store }}/>
  </Provider>,
  document.getElementById('root')
);

getUserInfo()
  .then((userInfo) => {
    store.dispatch(setUserInfo(userInfo));
  })
  .catch((error) => {
    console.log(error);
  });
