import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import Provider from 'react-redux/lib/components/Provider';

import configureStore from './store/index';
import levelize from './util/levelize';
import visualizeDeep from './util/visualize/deep';
import { setDeepTree } from './actions/index';
import { getRoutes } from './routing';

import jsonData from '../static/cs-structure.json';

const start = performance.now();

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const levelizedTree = levelize(jsonData);
const deep = visualizeDeep(levelizedTree);

store.dispatch(setDeepTree(deep));
console.log(deep.toJS());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{getRoutes()}</Router>
  </Provider>,
  document.getElementById('app')
);

const end = performance.now();
console.log('render time', end - start);
