export const SET_DATA_TREE = 'SET_DATA_TREE';
export const SET_NODES = 'SET_NODES';

export function setDataTree(tree) {
  return {
    type: SET_DATA_TREE,
    tree
  };
}

export function setNodes(nodes) {
  return {
    type: SET_NODES,
    nodes
  };
}
