export const SET_DATA_TREE = 'SET_DATA_TREE';
export const SET_NODES = 'SET_NODES';
export const SET_BRANCHES = 'SET_BRANCHES';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_REFERENCE = 'OPEN_REFERENCE';

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

export function setBranches(branches) {
  return {
    type: SET_BRANCHES,
    branches
  };
}

export function openModal() {
  return {
    type: OPEN_MODAL
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

export function openReference(nodeId) {
  return {
    type: OPEN_REFERENCE,
    nodeId
  };
}
