import React, {Component} from 'react';
import '../styles/Card.css';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard(event) {
    this.setState(prevState => ({
      selected: !prevState.selected
    }));
  }

  render() {
    return (
      <button className="Card" aria-pressed={this.state.selected} onClick={this.selectCard}>
        <div>{this.props.number}</div>
        <div>{this.props.color}</div>
        <div>{this.props.texture}</div>
        <div>{this.props.shape}</div>
      </button>
    );
  }
}

export default Card;