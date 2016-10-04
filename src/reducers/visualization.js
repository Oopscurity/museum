import { List, Map } from 'immutable';
import { SET_BRANCHES, SET_NODES, OPEN_REFERENCE, SET_DEEP_TREE } from '../actions';

export const initialState = Map({
  branches: List(),
  deepTree: List(),
  nodes: List()
});

export default function reducer(state = initialState, action) {
  let nextState = state;
  switch (action.type) {
    case SET_NODES: {
      nextState = nextState.set('nodes', action.nodes);
      break;
    }
    case SET_BRANCHES: {
      nextState = nextState.set('branches', action.branches);
      break;
    }
    case SET_DEEP_TREE: {
      nextState = nextState.set('deepTree', action.deepTree);
      break;
    }
  }
  return nextState;
}
