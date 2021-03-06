import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import { Map as ImmutableMap } from 'immutable';

import { createSelector } from '../selectors';
import ModalContainer from './Modal';

class Reference extends React.Component {
  static defaultProps = {
    description: ''
  };

  render() {
    if (!this.props.title) {
      return false;
    }

    return (
      <ModalContainer title={this.props.title}>
        <div>
          <div className="reference">
            <Markdown source={`# ${this.props.title}`} />
            <Markdown source={this.props.description} />
          </div>
        </div>
      </ModalContainer>
    );
  }
}

const referenceSelector = createSelector(
  state => state.getIn(['visualization', 'nodes']),
  state => state.getIn(['reference', 'id']),
  (nodes, referenceId) => nodes.getIn([referenceId, 'data'], ImmutableMap({}))
);

const inputSelector = createSelector(
  [referenceSelector],
  reference => ({
    description: reference.get('description'),
    title: reference.get('title')
  })
);

export default connect(inputSelector)(Reference);
