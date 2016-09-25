import { List, Map } from 'immutable';
import { SET_BRANCHES, SET_NODES, OPEN_REFERENCE } from '../actions';

export const initialState = Map({
  branches: List(),
  nodes: List(),
  referenceId: ''
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
    case OPEN_REFERENCE: {
      nextState = nextState.set('referenceId', action.nodeId);
      break;
    }
  }
  return nextState;
}
