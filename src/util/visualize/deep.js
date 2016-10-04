import { fromJS } from 'immutable';
import reduce from 'lodash/reduce';
import flatten from 'lodash/flatten';
import chunk from 'lodash/chunk';
import maxBy from 'lodash/maxBy';

export const toRadians = degree =>
  degree * Math.PI / 180;

export const toCartesian = (phi, rho) => ({
  x: rho * Math.cos(phi),
  y: rho * Math.sin(phi)
});

export const defaultConfig = {
  h: 100,
  k: 0.5,
  rho: 0,
  fontSize: 18,
  maxRho: 1000,
  phiRange: {
    min: -Math.PI,
    max: Math.PI
  }
};

export const getCoordinates = (node, { width, height, rho }) => {
  const phiCenter = node.phiRange.min + node.phiRange.max;
  const { x, y } = toCartesian(phiCenter, rho);

  return {
    x1: x - width / 2,
    x2: x + width / 2,
    y1: y - height / 2,
    y2: y + height / 2
  };
};

export const getDimentions = (words, i, config) => {
  let chunks = [words];
  if (i > 0) {
    chunks = chunk(words, i).filter(a => a.length);
  }

  const rows = chunks.map(row => row.join(' '));
  const longestRow = maxBy(rows, s => s.length);
  const rowNumber = rows.length;

  return {
    width: config.fontSize * 0.5 * longestRow.length + 2 * config.fontSize * config.k,
    height: config.fontSize * rowNumber + 2 * config.fontSize * config.k
  };
};

export const checkIntersect = ({ x1, x2, y1, y2 }, { x1: a1, x2: a2, y1: b1, y2: b2 }) => (
  (((x1 >= a1) && (x1 <= a2)) || ((a1 >= x1) && (a1 <= x2))) &&
  (((y1 >= b1) && (y1 <= b2)) || ((b1 >= y1) && (b1 <= y2)))
);

export function checkIntersectAlways(leftNode, rightNode, config) {
  const leftTitle = leftNode.data.title.split(' ');
  const rightTitle = rightNode.data.title.split(' ');

  for (let i = 0; i < leftTitle.length; ++i) {
    const leftDim = getDimentions(leftTitle, i, config);
    const leftCoords = getCoordinates(leftNode, { ...leftDim, rho: config.rho });

    for (let j = 0; j < rightTitle.length; ++j) {
      const rightDim = getDimentions(rightTitle, i, config);
      const rightCoords = getCoordinates(rightNode, { ...rightDim, rho: config.rho });

      if (!checkIntersect(leftCoords, rightCoords)) {
        return false;
      }
    }
  }

  return true;
}

export function visualizeLevel(parentLevel, level, config) {
  if (!parentLevel) {
    return {
      visualization: [
        { ...level[0], phiRange: config.phiRange, rho: 0 }
      ],
      nextConfig: { ...defaultConfig, rho: 50 }
    };
  }

  const nodes = flatten(parentLevel.map(parent => {
    const children = level.filter(n => n.parentId === parent.id);
    const rangeParts = reduce(children, (acc, child) => {
      acc += child.depth;
      return acc;
    }, 0);
    const range = parent.phiRange.max - parent.phiRange.min;

    let d = parent.phiRange.min; // = 0;
    return children.map(child => {
      const nextD = d + child.depth * range / rangeParts;
      const rangedChild = { ...child, phiRange: { min: d, max: nextD } };
      d = nextD;

      return rangedChild;
    });
  }));

  let rho, intersect;
  for (rho = config.rho; rho <= config.maxRho; rho += config.h) {
    intersect = false;

    for (let i = 0; i < nodes.length - 1; ++i) {
      if (checkIntersectAlways(nodes[i], nodes[i + 1], { ...config, rho })) {
        intersect = true;
        break;
      }
    }

    if (intersect) {
      continue;
    } else {
      break;
    }
  }

  const visualization = nodes.map(node => ({ ...node, rho, fontSize: config.fontSize - 1 }));
  const nextConfig = { ...config, rho: rho + 100, fontSize: config.fontSize - 1 };

  return {
    visualization,
    nextConfig
  };
}

export default function visualizeDeep(levelizedTree) {
  let config = defaultConfig;
  const visualizedLevels = reduce(levelizedTree.toJS(), (acc, level, levelId) => {
    let parentLevel;
    if (levelId > 0) {
      parentLevel = acc[levelId - 1];
    }


    const { visualization, nextConfig } = visualizeLevel(parentLevel, level, config);

    console.log(levelId, level, parentLevel, visualization, config, nextConfig);

    config = nextConfig;
    acc.push(visualization);
    return acc;
  }, []);

  return fromJS(flatten(visualizedLevels));
}
