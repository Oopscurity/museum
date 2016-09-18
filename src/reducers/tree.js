import Node from '../immutable/Node';
import { SET_DATA_TREE } from '../actions';

export const initialState = new Node();

export default function reducer(state = initialState, action) {
  let nextState = state;
  switch (action.type) {
    case SET_DATA_TREE:
      nextState = action.tree;
  }
  return nextState;
}
