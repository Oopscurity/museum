import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';

export default class Modal extends React.Component {
  static defaultProps = {
    onHide: () => {},
    visible: false
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (this.props.visible && (e.keyCode === 27)) {
      this.props.onHide(e);
    }
  };

  handleBoxClick = (e) => {
    e.stopPropagation();
  };

  handleTouchMove = (e) => {
    e.stopPropagation();
  };

  render() {
    const className = classNames('modal__container', {
      'hidden': !this.props.visible
    });

    return (
      <div className={className} onClick={this.props.onHide} onTouchMove={this.props.onHide}>
        {this.props.visible &&
          <Helmet title={this.props.title} />
        }
        <div className="modal__box" onClick={this.handleBoxClick} onTouchMove={this.handleTouchMove}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
