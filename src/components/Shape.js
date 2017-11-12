import React from 'react';
import PropTypes from 'prop-types';

import CATEGORIES from '../helper/Categories.js';

const Shape = function({color, texture, shape}) {
  return (
    <svg viewBox="-10 -10 190 420" className={'shape shape--' + color + ' shape--' + texture}>
      <use x="0" y="0" width="170" height="400" href={'#' + shape} />
    </svg>
  );
}

Shape.propTypes = {
  color: PropTypes.oneOf(CATEGORIES.color),
  texture: PropTypes.oneOf(CATEGORIES.texture),
  shape: PropTypes.oneOf(CATEGORIES.shape)
}

export default Shape;