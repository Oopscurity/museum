import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import tree from './tree';

export default combineReducers(Map({
  tree
}));
