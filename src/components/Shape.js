import React, {Component} from 'react';

const Shape = function({color, texture, shape}) {
  return (
    <svg viewBox="-10 -10 190 420" className={'shape shape--' + color + ' shape--' + texture}>
      <use x="0" y="0" width="170" height="400" href={'#' + shape} />
    </svg>
  );
}

export default Shape;