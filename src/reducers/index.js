import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import visualization from './visualization';
import tree from './tree';
import ui from './ui';
import reference from './reference';

export default combineReducers(Map({
  visualization,
  tree,
  ui,
  reference
}));
