import React from 'react';
import Helmet from 'react-helmet';

import Sidebar from '../containers/Sidebar';

export default class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div className="page">
        <Helmet title="Главная" titleTemplate="%s - Виртуальный музей информатики"/>
        {this.props.children}
        <Sidebar />
      </div>
    );
  }
}
