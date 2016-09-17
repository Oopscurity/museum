import { expect } from 'chai';

import configureStore from '../../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = configureStore();
    expect(store.getState()).to.be.ok;
  });
});
