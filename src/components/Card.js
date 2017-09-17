import React, {Component} from 'react';

class Card extends Component {

  render() {
    return (
      <button>
        <div>{this.props.properties.number}</div>
        <div>{this.props.properties.color}</div>
        <div>{this.props.properties.texture}</div>
        <div>{this.props.properties.shape}</div>
      </button>
    );
  }
}

export default Card;