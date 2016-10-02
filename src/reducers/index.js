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

export const initialState = Map({
  visualization: require('./visualization').initialState,
  tree: require('./tree').initialState,
  ui: require('./ui').initialState,
  reference: require('./reference').initialState
});
