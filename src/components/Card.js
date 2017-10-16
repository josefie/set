import React, {Component} from 'react';

import '../styles/Card.css';

class Card extends Component {

  constructor(props) {
    super(props);

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
    this.props.onSelectCard(this);
  }

  isSelected() {
    return this.props.selected;
  }

  getId() {
    return this.props.id;
  }

  renderShapes() {
    let shapes = [];

    for (let i = 0; i < this.props.properties.number; i++) {
      shapes.push(<use x="0" y="0" width="170" height="400" href={'#' + this.props.properties.shape}/>);
    }

    return shapes;
  }

  render() {

    return (
      <button className="Card" aria-pressed={this.props.selected} onClick={this.selectCard}>
        <svg viewBox="0 0 170 400" fill={this.props.properties.color}>
          {this.renderShapes()}
        </svg>
        
        <div>{this.props.properties.number}</div>
        <div>{this.props.properties.color}</div>
        <div>{this.props.properties.texture}</div>
        <div>{this.props.properties.shape}</div>
      </button>
    );
  }
}

export default Card;