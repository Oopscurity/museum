import { List, Map } from 'immutable';
import ExtMap from 'extendable-immutable/lib/Map';

export default class RawNode extends ExtMap {
  static isNode(val) {
    return val && val instanceof RawNode;
  }

  static fromJS(val: Object) {
    const children = val.children.map(child => RawNode.fromJS(child));
    return new RawNode(Map(val.data), List(children));
  }

  constructor(data: Map = Map(), children: List = List()) {
    super({ data, children });
  }
}
