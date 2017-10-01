import React, { Component } from 'react';
import Timer from './Timer.js';
import StatusBar from './StatusBar.js';
import RestartButton from './RestartButton.js';
import Card from './Card.js';
import CardDeck from '../helper/CardDeck.js';
import CATEGORIES from '../helper/Categories.js';

const SET_SIZE = 3;
const DECK = CardDeck.create();

function allDifferent(cards) {
  if (cards.length !== SET_SIZE) {
    console.error('Wrong number of cards.');
    return;
  }

  if (cards[0] === cards[1] || cards[1] === cards[2] || cards[0] === cards[2]) {
    return false;
  }
  return true;
}

function allSame(cards) {
  if (cards.length !== SET_SIZE) {
    console.error('Wrong number of cards.');
    return;
  }

  return cards[0] === cards[1] && cards[1] === cards[2];
}

class Game extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentCards: [],
      selectedCards: [],
      sets: [],
      tries: 0
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentWillMount() {
    this.restartGame();
  }

  componentDidUpdate() {
    if (this.state.selectedCards.length === SET_SIZE) {
      this.checkMatches();
    }
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

  getRandomIndex() {
    return Math.floor(Math.random() * this.getNumberOfCards());
  }

  getRandomCards(number) {
    let nextCards = [];

    for (var i = 0; i < number && this.getNumberOfCards() > 0; i++) {
      let removedCard = this.cards.splice(this.getRandomIndex(), 1)[0];
      nextCards.push(removedCard);
    }
    
    return nextCards;
  }

  getNumberOfCards() {
    return this.cards.length;
  }

  getNumberOfSets() {
    return this.state.sets.length;
  }

  getCardById(id) {
    const index = DECK.map((card) => card.id).indexOf(id);
    return DECK[index];
  }

  restartGame() {
    this.cards = DECK.slice();

    this.setState({
      currentCards: this.getRandomCards(12),
      selectedCards: [],
      sets: [],
      tries: 0
    });
  }

  checkMatches() {
    let isSet = true;
    let cards = this.state.selectedCards.map((id) => this.getCardById(id));

    Object.keys(CATEGORIES).forEach(function(category) {
      let categoryValues = cards.map((card) => card[category]);

      if (!allSame(categoryValues) && !allDifferent(categoryValues)) {
        isSet = false;
      }
    });

    if (isSet) {
      console.log('SET!');
      this.addSet();
      this.unselectAllCards();
      this.increaseAttemptsCounter();
    } else {
      console.log('No set :(');
      this.increaseAttemptsCounter();
      this.unselectAllCards();
    }
  }

  addSet() {
    let sets = this.state.sets;
    sets.push(this.state.selectedCards);

    this.setState({
      sets: sets
    });
  }

  increaseAttemptsCounter() {
    this.setState(function(prevState) {
      return {
        tries: prevState.tries + 1
      }
    });
  }

  unselectAllCards() {
    this.setState({
      selectedCards: []
    });
  }

  render() {
    const selectedCards = this.state.selectedCards;
    const handleSelectCard = this.handleSelectCard;

    const cards = this.state.currentCards.map(function(card) {
      let isSelected = (selectedCards.indexOf(card.id)) !== -1;

      return (
      <li className="CardWrapper" key={card.id}>
        <Card selected={isSelected} onSelectCard={handleSelectCard} id={card.id} number={card.number} color={card.color} texture={card.texture} shape={card.shape} />
      </li>
      );
    });

    return (
      <div className="Game">
        <div className="Board">
          <ul>
            {cards}
          </ul>
        </div>
        <Timer timestamp={new Date()} />
        <StatusBar cardsLeft={this.getNumberOfCards()} sets={this.getNumberOfSets()} tries={this.state.tries} />
        <RestartButton onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;