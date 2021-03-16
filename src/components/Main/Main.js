import React from 'react';
import PropTypes from 'prop-types';

import classes from './Main.module.sass';

function Main({ children }) {
  return <main className={classes.main}>{children}</main>;
}

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Main.defaultProps = {
  children: [],
};

export default Main;
