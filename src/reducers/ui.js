import { Map as ImmutableMap } from 'immutable';

import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

export const initialState = ImmutableMap({
  isModalVisible: false
});

export default function reducer(state = initialState, action) {
  let nextState = state;
  switch (action.type) {
    case OPEN_MODAL: {
      nextState = state.set('isModalVisible', true);
      break;
    }
    case CLOSE_MODAL: {
      nextState = state.set('isModalVisible', false);
      break;
    }
  }
  return nextState;
}
