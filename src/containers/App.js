import React from 'react';

export default class App extends React.Component {
  static defaultProps = {
    children: false
  };
  
  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
