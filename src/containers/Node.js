import React from 'react';
import { connect } from 'react-redux';
import { Circle } from 'react-konva';

import { createSelector } from '../selectors';
import { openReference } from '../actions';

class Node extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  handleClick = () => {
    this.props.openReference(this.props.id)
  };

  render() {
    const params = this.props.params;
    return (
      <Circle
        fill="white"
        radius={params.get('R')}
        stroke="black"
        stroke-width={2}
        x={params.get('x')}
        y={params.get('y')}
        onClick={this.handleClick}
      />
    );
  }
}

const getCurrentNode = (state, props) =>
  state.getIn(['visualization', 'nodes']).get(props.id);

const makeInputSelector = () => (
  createSelector(
    getCurrentNode,
    node => ({
      data: node.get('data'),
      params: node.get('params')
    })
  )
);

const outputSelector = (dispatch) => ({
  openReference: (nodeId) => dispatch(openReference(nodeId))
});

export default connect(makeInputSelector, outputSelector)(Node);
