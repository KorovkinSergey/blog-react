import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spin } from 'antd';

import classes from './LoadingBar.module.sass';

function LoadingBar({ small, transparent }) {
  const size = small ? 'small' : 'large';

  return (
    <div className={classNames(classes.loading, transparent ? classes.transparent : null)}>
      <Spin size={size} />
    </div>
  );
}

LoadingBar.propTypes = {
  small: PropTypes.bool,
  transparent: PropTypes.bool,
};

LoadingBar.defaultProps = {
  small: false,
  transparent: false,
};

export default LoadingBar;
