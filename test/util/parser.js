import { expect } from 'chai';
import { Map, List } from 'immutable';

import {
  transformData,
  transformChildren,
  convertTreeToNode
} from '../../src/util/parser';
import Node from '../../src/immutable/Node';

describe('parser', () => {
  describe('transformData()', () => {
    it('adds correct id and url', () => {
      const data = { title: 'Информатика' };
      const nextData = transformData(data);
      expect(nextData).to.deep.equal({ id: '1', title: 'Информатика', url: 'ynformatyka' });
    });
  });
  describe('transformChildren()', () => {
    it('transforms one child', () => {
      const children = [{ data: { title: 123 } }];
      const nextChildren = transformChildren(children);
      expect(nextChildren).to.deep.equal([
        {
          data: { id: '2', title: 123, url: '123' },
          children: []
        }
      ]);
    });
    it('transforms two children', () => {
      const children = [{ data: { title: 'first' } }, { data: { title: 'second' } }];
      const nextChildren = transformChildren(children);
      expect(nextChildren).to.deep.equal([
        {
          data: { id: '3', title: 'first', url: 'first' },
          children: []
        },
        {
          data: { id: '4', title: 'second', url: 'second' },
          children: []
        }
      ]);
    });
  });
  describe('convertTreeToNode()', () => {
    it('converts to correct Node', () => {
      const tree = { data: { title: 'first' }, children: [] };
      const node = convertTreeToNode(tree);
      expect(node).to.be.an.instanceOf(Node);
      expect(node.get('data')).to.be.an.instanceOf(Map);
      expect(node.getIn(['data', 'title'])).to.equal('first');
      expect(node.get('children')).to.be.an.instanceOf(List);
    });
  });
});
