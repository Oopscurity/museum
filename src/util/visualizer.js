/**
 * TODO: provide parameterized visualization at runtime
 */

import reduce from 'lodash/reduce';
import { List, Map as ImmutableMap } from 'immutable';

export const blankVisualization = ImmutableMap({
  branches: List(),
  nodes: List()
});

// Konva Framework represents vertices of polygonal chains (and plain lines too)
// with Array<Number> e.g. [x1, y1, x2, y2, x3, y3, ...]
// so processBranch() concatenates Lists that contain coordinates as [x, y]
export function processBranch(from, to) {
  return ImmutableMap({
    points: from.concat(to)
  });
}

export function processNode(nodeData, params) {
  return ImmutableMap({
    data: ImmutableMap(nodeData),
    params: ImmutableMap(params)
  });
}

export function getVectorCoords(angle, length) {
  const angleRad = angle * Math.PI / 180;
  return [
    length * Math.cos(angleRad),
    length * Math.sin(angleRad)
  ];
}

export function rotate(x, y, angle) {
  const angleRad = angle * Math.PI / 180;
  return [
    x * Math.cos(angleRad) - y * Math.sin(angleRad),
    x * Math.sin(angleRad) + y * Math.cos(angleRad)
  ];
}

const listMerger = (prev, next) => prev.concat(next);

/*
  TODO: compare performance with both mutable immutable 'acc'
  1. https://github.com/facebook/immutable-js/issues/484
 */
export function iterateProcessTree(acc, node, params) {
  const processedNode = processNode(node.data, params);
  let accNext = acc.update('nodes', nodes => nodes.push(processedNode));
  const childrenNumber = node.children.length;

  if (!childrenNumber) {
    return accNext;
  }

  // common params
  const childRadius = params.R * 0.7;
  const childBranchLength = params.L * 0.8;
  const childRange = params.range * 0.4;

  // used in computations
  const branchLength = params.L + params.R;

  if (childrenNumber === 1) {
    const child = node.children[0];

    // now it's a radius vector
    const [x, y] = getVectorCoords(0, branchLength);

    // apply parent's angle
    let [x1, y1] = rotate(x, y, params.origin);

    // don't forget about parent's coordinates (context)
    x1 += params.x;
    y1 += params.y;

    const childParams = {
      x: x1, y: y1,
      range: childRange,
      origin: params.origin,
      R: childRadius,
      L: childBranchLength
    };

    const branch = processBranch([params.x, params.y], [x1, y1]);
    accNext = accNext.update('branches', branches => branches.push(branch));
    return iterateProcessTree(accNext, child, childParams);
  }

  // childrenNumber >= 2
  const accChildren = reduce(node.children,
    (childrenAcc, child, i) => {
      // rotation should satisfy (-range/2 <= angle <= range/2)
      // e.g. for the range of 90 degree it's -45 <= angle <= 45
      let angle;
      if ((childrenNumber % 2 == 0) && (params.range <= 180)) {
        // first method - strict in terms of the range - includes limits
        const rangePerChild = params.range / (childrenNumber - 1);
        angle = i * rangePerChild - params.range / 2;
      } else if ((childrenNumber % 2 == 1) && (params.range <= 320)) {
        const rangePerChild = params.range / (childrenNumber - 1);
        angle = i * rangePerChild - params.range / 2;
      } else {
        // second method - soft, distributes the space between children evenly
        // especially useful with 360 degree (circular) range
        angle = (i + 1) * params.range / childrenNumber - params.range / 2;
      }
      const [x, y] = getVectorCoords(angle, branchLength);
      let [x1, y1] = rotate(x, y, params.origin);
      x1 += params.x;
      y1 += params.y;

      const childParams = {
        x: x1, y: y1,
        range: childRange,
        origin: params.origin + angle,
        R: childRadius,
        L: childBranchLength
      };

      const branch = processBranch([params.x, params.y], [x1, y1]);
      const ch = childrenAcc.update('branches', branches => branches.push(branch));
      return ch.mergeWith(listMerger,
        iterateProcessTree(blankVisualization, child, childParams)
      );
    }, blankVisualization);

  return accNext.mergeWith(listMerger, accChildren);
}

// TODO: argument validation with Flow
export function processTree(tree) {
  const initialParams = { x: 0, y: 0, R: 30, L: 300, origin: 0, range: 360 };
  return iterateProcessTree(blankVisualization, tree.root, initialParams);
}



