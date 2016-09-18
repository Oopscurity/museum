import { List, Map } from 'immutable';
import ExtMap from 'extendable-immutable/lib/Map';

export default class Node extends ExtMap {
  static isNode(val) {
    return val && val instanceof Node;
  }

  static fromJS(val: Object) {
    const children = val.children.map(child => Node.fromJS(child));
    return new Node(Map(val.data), List(children));
  }

  constructor(data: Map = Map(), children: List = List()) {
    super({ data, children });
  }
}
