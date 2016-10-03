import { fromJS } from 'immutable';
import reduce from 'lodash/reduce';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';

export function normalizeChildren(children, parentId) {
  return children ? reduce(children, normalizeBranch(parentId), []) : [];
}

export function normalizeNode(node, options) {
  return { ...omit(node, ['children']), ...options };
}

export function normalizeBranch(rootId) {
  return function (acc, node) {
    const id = uniqueId();
    acc.push(normalizeNode(node, { id, parentId: rootId }));
    acc.push(normalizeChildren(node.children, id));
    return acc;
  };
}

export default function normalize(tree) {
  const begin = root => normalizeBranch(undefined)([], root);
  const nodes = tree.root ? begin(tree.root) : begin(tree);
  return fromJS(nodes);
}
