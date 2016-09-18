import { expect } from 'chai';

import { setDataTree } from '../../src/actions';
import reducer, { initialState } from '../../src/reducers/tree';
import Node from '../../src/immutable/Node';

export default function treeReducerSpec() {
  describe('tree', () => {
    it('has valid initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
    it('handles SET_DATA_TREE', () => {
      const tree = Node.fromJS({ data: { title: 'Title' }, children: [] });
      const action = setDataTree(tree);
      const nextState = reducer(undefined, action);
      expect(nextState).to.deep.equal(tree);
    });
  });
}
