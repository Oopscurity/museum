import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import nodes from './nodes';
import tree from './tree';

export default combineReducers(Map({
  nodes,
  tree
}));
