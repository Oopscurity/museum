import { fromJS } from 'immutable';
import { expect } from 'chai';

import { defaultSelector } from '../../src/selectors';

describe('Selectors:', () => {
  describe('defaultSelector()', () => {
    it('returns vanilla JS equivalent of immutable state', () => {
      const state = fromJS({
        rootMap: {
          first: 1,
          second: 2,
          list: ['firstNode', { secondNode: 'secondNodeContent' }]
        },
        rootList: ['Hello', ',', ' ', 'World', '!']
      });
      const selectedState = defaultSelector(state);

      expect(selectedState).to.deep.equal(state.toJS());
    });
  });
});
