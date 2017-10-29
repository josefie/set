import React, {Component} from 'react';

class Shape extends Component {
  render() {
    return (
      <svg viewBox="-10 -10 190 420" className={'shape shape--' + this.props.color + ' shape--' + this.props.texture}>
        <use x="0" y="0" width="170" height="400" href={'#' + this.props.shape} />
      </svg>
    );
  }
}

export default Shape;