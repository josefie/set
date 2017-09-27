import React, {Component} from 'react';
import Card from './Card.js';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCards: []
    }

    this.handleSelectCard = this.handleSelectCard.bind(this);
  }

  handleSelectCard(card) {
    let selectedCardsCopy = this.state.selectedCards.slice();

    if (!card.isSelected()) {
      selectedCardsCopy.push(card.getId());
    } else {
      let index = selectedCardsCopy.indexOf(card.getId());
      selectedCardsCopy.splice(index, 1);
    }

    this.setState({
      selectedCards: selectedCardsCopy
    });
  }

  componentDidUpdate() {
    this.checkMatches();
  }

  checkMatches() {
    console.log(this.state.selectedCards);

    if (this.state.selectedCards.length === 3) {

      // TODO: check if the three cards match
      let isMatch = false;

      if (isMatch) {
        this.setState({
          selectedCards: []
        });
      }
    }
  }

  render() {
    const selectedCards = this.state.selectedCards;
    const handleSelectCard = this.handleSelectCard;

    const cards = this.props.cards.map(function(card) {
      let isSelected = (selectedCards.indexOf(card.id)) !== -1;

      console.log(card.id + (isSelected ? ' is selected' : ' is not selected'));

      return (
      <li className="CardWrapper" key={card.id}>
        <Card selected={isSelected} onSelectCard={handleSelectCard} id={card.id} number={card.number} color={card.color} texture={card.texture} shape={card.shape} />
      </li>
      );
    });

    return (
      <div className="Board">
        <ul>
          {cards}
        </ul>
      </div>
    );
  }
}

export default Board;