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
        <div>{this.props.number}</div>
        <div>{this.props.color}</div>
        <div>{this.props.texture}</div>
        <div>{this.props.shape}</div>
      </button>
    );
  }
}

export default Card;