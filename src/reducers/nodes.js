import { List } from 'immutable';
import { SET_NODES } from '../actions';

export const initialState = List();

export default function reducer(state = initialState, action) {
  let nextState = state;
  switch (action.type) {
    case SET_NODES: {
      nextState = action.nodes;
    }
  }
  return nextState;
}
