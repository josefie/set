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

  render() {
    return (
      <button className="Card" aria-pressed={this.props.selected} onClick={this.selectCard}>
        <div>{this.props.properties.number}</div>
        <div>{this.props.properties.color}</div>
        <div>{this.props.properties.texture}</div>
        <div>{this.props.properties.shape}</div>
      </button>
    );
  }
}

export default Card;