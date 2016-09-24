import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import visualization from './visualization';
import tree from './tree';

export default combineReducers(Map({
  visualization,
  tree
}));
