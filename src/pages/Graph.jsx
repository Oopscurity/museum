import React, { PropTypes } from 'react';
import { Arrow, Line, Stage, Layer, Group, Text, Rect } from 'react-konva';

const f1 = x => 1 / (0.001 * x);
const f2 = x => 50 * Math.sin(x * 0.1);
const f3 = x => 0.01 * x*x;
const f4 = x => 0.0001 * x*x*x;

const POINTER_CONFIG = {
  pointerLength: 5,
  pointerWidth: 5,
  fill: 'gray',
  stroke: 'gray',
  strokeWidth: 2
};

const TEXT_CONFIG = {
  fill: 'black',
  fontSize: '16'
};

export default class GraphPage extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      mounted: false
    };

    this.width;
    this.height;
  }

  componentDidMount() {
    this.width = window.innerWidth * 0.8;
    this.height = window.innerHeight * 0.8;

    this.stage.getStage().width(window.innerWidth);
    this.stage.getStage().height(window.innerHeight);

    this.gr.x(window.innerWidth / 2);
    this.gr.y(window.innerHeight / 2);

    this.setState({ mounted: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  drawInitials = (mounted) => {
    if (!mounted) {
      return false;
    }

    return (
      <Group>
        <Arrow
          {...POINTER_CONFIG}
          x={-this.width / 2}
          y={0}
          points={[0, 0, this.width, 0]}
        />
        <Arrow
          {...POINTER_CONFIG}
          x={0}
          y={-this.height / 2}
          points={[0, this.height, 0, 0]}
        />
        <Text {...TEXT_CONFIG} x={-20} y={10} text="0" />
        <Text {...TEXT_CONFIG} x={this.width / 2 - 20} y={10} text="x" />
        <Text {...TEXT_CONFIG} x={-20} y={-this.height / 2 + 10} text="y" />
      </Group>
    );
  };

  drawGraphs = (mounted) => {
    if (!mounted) {
      return false;
    }

    let points1 = [],
        points2 = [],
        points3 = [],
        points4 = [];

    for (let x = -this.width / 2; x <= this.width / 2; ++x) {
      points1.push(x, -f1(x));
      points2.push(x, -f2(x));
      points3.push(x, -f3(x));
      points4.push(x, -f4(x));
    }

    return (
      <Group>
        <Line stroke="gray" strokeWidth={1} points={points1} />
        <Line stroke="red" strokeWidth={1} points={points2} />
        <Line stroke="green" strokeWidth={1} points={points3} />
        <Line stroke="orange" strokeWidth={1} points={points4} />
      </Group>
    );
  };

  
  drawInfo = (mounted) => {
    return false;

    return (
      <Group>
        <Rect
          height={150}
          stroke="black"
          strokeWidth={1}
          width={300}
          x={this.width / 4}
          y={this.height / 4}
        >
          <Text {...TEXT_CONFIG} text="12312313" />
          <Rect
            fill="grey"
            height={10}
            width={10}
            x={20}
            y={20}
            stroke="black"
            strokeWidth={1}
          />
        </Rect>
      </Group>
    );
  };

  render() {
    const { mounted } = this.state;

    return (
      <div>
        <Stage ref={c => this.stage = c} onWheel={this.handleScroll}>
          <Layer ref={c => this.layer = c}>
            <Group ref={c => this.gr = c}>
              {this.drawInitials(mounted)}
              {this.drawGraphs(mounted)}
              {this.drawInfo(mounted)}
            </Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}
