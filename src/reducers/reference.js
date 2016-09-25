import { Map as ImmutableMap } from 'immutable';

import { OPEN_REFERENCE } from '../actions';

export const initialState = ImmutableMap({
  id: null
});

export default function reducer(state = initialState, action) {
  let nextState = state;
  switch (action.type) {
    case OPEN_REFERENCE: {
      nextState = state.set('id', action.nodeId);
      break;
    }
  }
  return nextState;
}
