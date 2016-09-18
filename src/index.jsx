import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import Provider from 'react-redux/lib/components/Provider';

import configureStore from './store';
import { setDataTree } from './actions';
import { getRoutes } from './routing';
import { prepareTree, convertTreeToNode } from './util/parser';
import jsonData from '../dist/cs-structure.json';

const store = configureStore();
const dataTreeRoot = convertTreeToNode(prepareTree(jsonData));
store.dispatch(setDataTree(dataTreeRoot));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{getRoutes()}</Router>
  </Provider>,
  document.getElementById('app')
);
