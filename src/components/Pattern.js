import React from 'react';
import PropTypes from 'prop-types';

import CATEGORIES from '../helper/Categories.js';

const Pattern = function({color}) {
  return (
    <pattern id={'pattern-' + color} patternUnits="userSpaceOnUse" width="20" height="20" className={'pattern--' + color}>
      <path d="M-1,1 l2,-2M0,4 l4,-4M3,5 l2,-2" strokeWidth="50"/>
    </pattern>
  );
};

Pattern.propTypes = {
  color: PropTypes.oneOf(CATEGORIES.color)
}

export default Pattern;