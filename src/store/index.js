import { fromJS } from 'immutable';
import { createStore, compose } from 'redux';

import reducer, { initialState } from '../reducers';

const browserHasDevTools = (typeof window === 'object') && (typeof window.devToolsExtension !== 'undefined');

export default function configureStore(state = initialState) {
  const store = createStore(reducer, fromJS(state), compose(
    browserHasDevTools ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
