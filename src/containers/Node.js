import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Ellipse, Text, Group } from 'react-konva';

import { createSelector } from '../selectors';
import { openReference, openModal } from '../actions';

const fontSize = 13;

class Node extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      fill: 'white'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps !== this.props) || (nextState != this.state);
  }

  handleClick = () => {
    const start = performance.now();
    this.props.openModal();
    this.props.openReference(this.props.id);
    const end = performance.now();
    console.log('open modal', end - start);
  };

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer';
    this.setState({ fill: '#ADD8E6' });
  }

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
    this.setState({ fill: 'white' });
  };

  render() {
    const params = this.props.params;
    const data = this.props.data;

    const width = data.get('title').length * fontSize;
    const height = params.get('R') * 2;

    return (
      <Group
        x={params.get('x') - width / 2}
        y={params.get('y') - height / 2}
        width={width}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleClick}
      >
        <Ellipse
          fill={this.state.fill}
          radius={{
            x: width / 2,
            y: height / 2
          }}
          stroke="black"
          strokeWidth={1}
          x={width / 2}
          y={height / 2}
        />
        <Text
          align="center"
          fill="black"
          fontFamily="Open Sans"
          fontSize={fontSize}
          text={data.get('title')}
          width={width}
          y={height / 2 - fontSize / 2}
        />
      </Group>
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
  ...bindActionCreators({ openReference, openModal }, dispatch)
});

export default connect(makeInputSelector, outputSelector)(Node);
