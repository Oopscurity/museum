import { fromJS } from 'immutable';
import reduce from 'lodash/reduce';
import uniqueId from 'lodash/uniqueId';

import { normalizeNode } from './normalize';

export function levelizeChildren(children, parentId) {
  return children ? reduce(children, levelizeBranch(parentId), []) : [];
}

export function levelizeBranch(rootId) {
  return function (acc, node) {
    const id = uniqueId();

    if (!acc.length) {
      acc.push([]);
    }

    let depth = 1;
    const children = levelizeChildren(node.children, id);
    children.forEach((level, i) => {
      depth += level.length;

      const relativeIndex = i + 1;
      if (acc.length < relativeIndex + 1) {
        acc.push([]);
      }

      acc[relativeIndex] = acc[relativeIndex].concat(level);
    });

    acc[0].push(normalizeNode(node, {
      id,
      depth,
      parentId: rootId
    }));

    return acc;
  };
}

export default function levelize(tree) {
  const begin = root => levelizeBranch()([], root);
  const nodes = tree.root ? begin(tree.root) : begin(tree);
  return fromJS(nodes);
}
