import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import visualization from './visualization';
import tree from './tree';
import ui from './ui';

export default combineReducers(Map({
  visualization,
  tree,
  ui
}));
