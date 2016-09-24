import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stage, Layer, Circle, Line, Group } from 'react-konva';

import { createSelector } from '../selectors';

// probably should be moved to the shapes
import { setCurrentNode } from '../actions';
import Node from './Node';

/*
  Actions with tree:

  1. Jump to the direct node through its url address
  2. Jump to previous/next and root nodes
  3. Place the node at the center of the screen
  4. Get the node's data and open modal
  5. Highlight active branch/node
  6. Show only the grid with portraits of people, not the tree
  7. Show node's tooltip on mouse hover event
  8. Zoom in/out the tree
  9. Smart resize
 */

class TreeVisualization extends React.Component {
  // TODO: flow type check
  shouldComponentUpdate(nextProps) {
    return nextProps.nodes.size !== this.props.nodes.size;
  }

  renderBranches = () => (
    this.props.branches.map((item, i) => (
      <Line
        key={i}
        points={item.get('points')}
        stroke="black"
        strokeWidth={2}
      />
    ))
  );

  render() {
    // TODO: runtime screen adaptation
    // TODO: scaling
    // TODO: moving the scene with keyboard (arrows and WASD)
    return (
      <Stage draggable width={window.innerWidth} height={window.innerHeight}>
        <Layer scaleX={0.5} scaleY={0.5}>
          <Group>
            {this.renderBranches()}
            {this.props.nodes.map((id) => (
              <Node id={id} key={id} />
            ))}
          </Group>
        </Layer>
      </Stage>
    );
  }
}

const inputSelector = createSelector(
  state => state.get('visualization'),
  visualization => ({
    branches: visualization.get('branches'),
    nodes: visualization.get('nodes').map(item => item.getIn(['data', 'id']))
  })
);

const outputSelector = dispatch => ({
  actions: bindActionCreators({ setCurrentNode }, dispatch)
});

export default connect(inputSelector, outputSelector)(TreeVisualization);
