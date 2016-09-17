import React from 'react';
import Helmet from 'react-helmet';


export default class Home extends React.Component {
  static displayName = 'Home';

  render() {
    return (
      <div>
        <Helmet title="Homepage"/>
        This is Homepage!
      </div>
    );
  }
}
