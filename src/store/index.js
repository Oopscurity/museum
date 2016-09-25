import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';

const browserHasDevTools = (typeof window === 'object') && (typeof window.devToolsExtension !== 'undefined');

export default function configureStore(state) {
  const store = createStore(reducer, state, compose(
    applyMiddleware(thunk),
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
