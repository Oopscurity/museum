import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { toggleSidebar } from '../actions';
import { createSelector } from '../selectors';

import Hamburger from '../components/Hamburger';

class Sidebar extends React.Component {
  static defaultProps = {
    isSidebarVisible: true
  };

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const className = classNames('sidebar', {
      'sidebar--hidden': !this.props.isSidebarVisible
    });

    return (
      <div className={className}>
        <div className="sidebar__header">
          <h1>Виртуальный музей информатики</h1>
          <Hamburger
            active={this.props.isSidebarVisible}
            onClick={this.props.toggleSidebar}
          />
        </div>
        <div className="sidebar__content"></div>
        <p className="sidebar__footer">Copyright © 2016 Артем Кравченко</p>
      </div>
    );
  }
}

const inputSelector = createSelector(
  state => state.getIn(['ui', 'isSidebarVisible']),
  isSidebarVisible => ({ isSidebarVisible })
);

const outputSelector = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar())
});

export default connect(inputSelector, outputSelector)(Sidebar);
