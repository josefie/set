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
    throw new Error("Wrong number of cards.");
  }

  if (cards[0] === cards[1] || cards[1] === cards[2] || cards[0] === cards[2]) {
    return false;
  }
  return true;
}

function allSame(cards) {
  if (cards.length !== SET_SIZE) {
    throw new Error("Wrong number of cards.");
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
      attempts: 0
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

  addThreeCards() {
    let nextCards = this.getRandomCards(SET_SIZE);

    this.setState(function(prevState) {
      return {
        currentCards: prevState.currentCards.concat(nextCards)
      };
    });
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
      attempts: 0
    });
  }

  isCategoryMatch(categoryValues) {
    if (!allSame(categoryValues) && !allDifferent(categoryValues)) {
      return false;
    }
    return true;
  }

  checkMatches() {
    let cards = this.state.selectedCards.map((id) => this.getCardById(id));

    let isSet = Object.keys(CATEGORIES).every((category) => {
      let categoryValues = cards.map((card) => card[category]);
      return this.isCategoryMatch(categoryValues);
    });

    if (isSet) {
      console.log('SET!');
      this.addSet(this.state.selectedCards);
      this.unselectAllCards();
      this.increaseAttemptsCounter();
      this.removeSetFromCurrentCards(this.state.selectedCards);
      this.addThreeCards();
    } else {
      console.log('No set :(');
      this.increaseAttemptsCounter();
      this.unselectAllCards();
    }
  }

  addSet(set) {
    this.setState(function(prevState) {
      let sets = prevState.sets;
      sets.push(set);
      return {
        sets: sets
      };
    });
  }

  removeSetFromCurrentCards(set) {
    let currentCards = this.state.currentCards;

    set.forEach(function(cardId) {
      let index = currentCards.map((card) => card.id).indexOf(cardId);
      currentCards.splice(index, 1);
    });
    
    this.setState({
      currentCards: currentCards
    });
  }

  increaseAttemptsCounter() {
    this.setState(function(prevState) {
      return {
        attempts: prevState.attempts + 1
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
        <StatusBar cardsLeft={this.getNumberOfCards()} sets={this.getNumberOfSets()} attempts={this.state.attempts} />
        <RestartButton onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;