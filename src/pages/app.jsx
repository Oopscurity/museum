import React from 'react';
import Helmet from 'react-helmet';

export default class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div className="page">
        <Helmet titleTemplate="%s - VMoCO"/>
        {this.props.children}
      </div>
    );
  }
}
