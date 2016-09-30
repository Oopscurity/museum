import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import Provider from 'react-redux/lib/components/Provider';

import configureStore from './store/index';
import { setDataTree, setNodes, setBranches } from './actions/index';
import { getRoutes } from './routing';
import { processTree } from './util/visualizer';
import { prepareTree, convertTreeToNode } from './util/parser';
import jsonData from '../static/cs-structure.json';

const start = performance.now();

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const dataTreeRoot = prepareTree(jsonData);
const normalizedData = processTree({ root: dataTreeRoot });

// store.dispatch(setDataTree(convertTreeToNode(dataTreeRoot)));
store.dispatch(setNodes(normalizedData.get('nodes')));
store.dispatch(setBranches(normalizedData.get('branches')));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{getRoutes()}</Router>
  </Provider>,
  document.getElementById('app')
);

const end = performance.now();
console.log('render time', end - start);
