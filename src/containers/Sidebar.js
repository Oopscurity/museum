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
    const className = classNames('sidebar layout__columns', {
      'sidebar--hidden': !this.props.isSidebarVisible
    });

    return (
      <div className={className}>
        <div className="layout__column">
          <div className="layout__row-grid">
            <div className="sidebar__header">
              <h1>Виртуальный музей информатики</h1>
            </div>
            <div className="sidebar__content">
              <div className="sidebar__main">
                <p>В рамках проекта "История инфоратики в лицах".</p>
                <p>Данный проект представляет структуру информатики в виде связного ациклического графа (дерева).</p>
                <p>В роли узлов выступают сферы информатики и выдающиеся личности, внесшие значительный вклад в науку.</p>
                <section>
                  <p>Масштабирование холста с деревом возможно с помощью колесика мыши.</p>
                  <p>Перемещение по дереву происходит благодаря нажатию на левую кнопку мыши.</p>
                </section>
              </div>
            </div>
            <p className="sidebar__footer">
              Copyright © 2016 <a href="https://github.com/Oopscurity" target="blank">Артем Кравченко</a>
            </p>
          </div>
        </div>
        <div className="layout__column">
          <Hamburger
            active={this.props.isSidebarVisible}
            onClick={this.props.toggleSidebar}
          />
        </div>
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
