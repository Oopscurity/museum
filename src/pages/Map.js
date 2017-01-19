import React, { PropTypes } from 'react';

import Reference from '../containers/Reference';
import TreeVisualization from '../containers/TreeVisualization';
import DeepVisualization from '../containers/DeepVisualization';

export default class MapPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string
    })
  };

  render() {
    const { params } = this.props;
    return (
      <div>
        {/* <TreeVisualization current={params.id} /> */}
        <DeepVisualization />
        <Reference />
      </div>
    );
  }
}


