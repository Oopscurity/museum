import translit from 'translitit-cyrillic-russian-to-latin';
import uniqueId from 'lodash/uniqueId';
import slug from 'slug';

import Node from '../immutable/Node';

export const transformData = (data) => ({
  ...data,
  id: uniqueId(),
  url: slug(translit(data.title), { lower: true })
});

export const transformChildren = (children = []) =>
  children.map(child => transform(child));

export const transform = (val) => ({
  data: transformData(val.data),
  children: transformChildren(val.children)
});

export function prepareTree(input: Object) {
  return transform(input);
}

export function convertTreeToNode(tree) {
  return Node.fromJS(tree);
}
