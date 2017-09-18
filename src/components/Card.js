import React, {Component} from 'react';

class Card extends Component {

  constructor(props) {
    super(props);

    this.number = props.number;
    this.color = props.color;
    this.texture = props.texture;
    this.shape = props.shape;
  }

  render() {
    return (
      <button>
        <div>{this.number}</div>
        <div>{this.color}</div>
        <div>{this.texture}</div>
        <div>{this.shape}</div>
      </button>
    );
  }
}

export default Card;