import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stage, Layer, Line, Group } from 'react-konva';

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
  componentDidMount() {
    this.stage.getStage().width(window.innerWidth);
    this.stage.getStage().height(window.innerHeight);

    this.gr.x(window.innerWidth / 2);
    this.gr.y(window.innerHeight / 2);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.nodes.size !== this.props.nodes.size;
  }

  handleScroll = (e) => {
    const delta = e.deltaY;
    const scale = (delta > 0) ? 1.1 : (1 / 1.1);
    this.gr.scaleX(this.gr.scaleX() * scale);
    this.gr.scaleY(this.gr.scaleY() * scale);
    this.layer.draw();
  };

  renderBranches = () => (
    this.props.branches.map((item, i) => (
      <Line
        key={i}
        points={item.get('points')}
        stroke="black"
        strokeWidth={1}
      />
    ))
  );

  render() {
    // TODO: runtime screen adaptation
    // TODO: moving the scene with keyboard (arrows and WASD)
    return (
      <div className="visualization" onWheel={this.handleScroll}>
        <Stage draggable ref={c => this.stage = c}>
          <Layer ref={c => this.layer = c}>
            <Group ref={c => this.gr = c}>
              {this.renderBranches()}
              {this.props.nodes.map((id) => (
                <Node id={id} key={id} />
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
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
