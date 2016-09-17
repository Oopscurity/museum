import { createSelectorCreator, defaultMemoize } from 'reselect';
import i from 'immutable';

export const createSelector = createSelectorCreator(
  defaultMemoize,
  i.is
);

export function defaultSelector(state) {
  return state.toJS();
}
