import React from 'react';
import classNames from 'classnames';

const Hamburger = ({ active, onClick }) => {
  const className = classNames('hamburger', {
    'hamburger--active': active
  });

  return (
    <div className={className} onClick={onClick}>
      <div></div>
    </div>
  );
};

Hamburger.defaultProps = {
  onClick: () => {}
};

export default Hamburger;
