import { expect } from 'chai';

import levelize from '../../src/util/levelize';

describe('levelize(tree)', () => {
  it('converts tree to leveled array', () => {
    const tree = {
      root: {
        children: [
          {}, { children: [{}, {}] }, {}
        ]
      }
    };
    const levelizedTree = levelize(tree);
    const rootId = parseInt(levelizedTree.getIn(['0', '0', 'id']));

    expect(levelizedTree.toJS()).to.deep.equal([
      [
        { depth: 6, id: `${rootId}`, parentId: undefined }
      ],
      [
        { depth: 1, id: `${rootId + 1}`, parentId: `${rootId}` },
        { depth: 3, id: `${rootId + 2}`, parentId: `${rootId}` },
        { depth: 1, id: `${rootId + 5}`, parentId: `${rootId}` }
      ],
      [
        { depth: 1, id: `${rootId + 3}`, parentId: `${rootId + 2}` },
        { depth: 1, id: `${rootId + 4}`, parentId: `${rootId + 2}` }
      ]
    ]);
  });
});
