import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './TagsBar.module.sass';

function TagsBar({ tagsArr, marginBottom, onClick, disabled }) {
  const tags = tagsArr.map((item) => {
    const currentClasses = classNames(classes.tag, marginBottom && classes['margin-bottom']);

    const newItem = (
      <button
        className={currentClasses}
        type="button"
        key={item}
        onClick={() => {
          onClick(item);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onClick(item);
        }}
        disabled={disabled}
      >
        {item}
      </button>
    );

    return newItem;
  });

  return <>{tags}</>;
}

TagsBar.propTypes = {
  tagsArr: PropTypes.array,
  marginBottom: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

TagsBar.defaultProps = {
  disabled: false,
  tagsArr: [],
  marginBottom: false,
  onClick: () => {},
};

export default TagsBar;
