import React, { Component } from 'react';

import StatusInfo from './StatusInfo.js';
import RestartButton from './RestartButton.js';
import Help from './Help.js';
import Card from './Card.js';
import Timer from './Timer.js';

import CardDeck from '../helper/CardDeck.js';
import CATEGORIES from '../helper/Categories.js';

const SET_SIZE = 3;
const BOARD_SIZE = 4 * SET_SIZE;
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
      cards: DECK.slice(),
      currentCards: [],
      selectedCards: [],
      sets: [],
      attempts: 0,
      timeElapsed: 0
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.startGame = this.startGame.bind(this);
    this.addThreeCards = this.addThreeCards.bind(this);
  }

  componentDidMount() {
    this.startGame();
    this.interval = setInterval(() => this.tickTimer(), 1000);
  }

  componentDidUpdate() {
    if (this.state.selectedCards.length === SET_SIZE) {
      this.checkMatches();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tickTimer() {
    this.setState((prevState) => {
      return {
        timeElapsed: prevState.timeElapsed + 1
      };
    });
  }

  startGame() {
    this.setState({cards: DECK.slice()}, function() {
      this.setState({
        currentCards: this.getRandomCards(12),
        selectedCards: [],
        sets: [],
        attempts: 0,
        timeElapsed: 0
      });
    });
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

  getRandomIndex(size) {
    return Math.floor(Math.random() * size);
  }

  getRandomCards(number) {
    let nextCards = [];
    let cardsLeft = this.state.cards;

    for (var i = 0; i < number && cardsLeft.length > 0; i++) {
      let removedCard = cardsLeft.splice(this.getRandomIndex(cardsLeft.length), 1)[0];
      nextCards.push(removedCard);
    }

    this.setState({
      cards: cardsLeft
    });
    
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
    return this.state.cards.length;
  }

  getCardById(id) {
    const index = DECK.map((card) => card.id).indexOf(id);
    return DECK[index];
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
      this.increaseAttemptsCounter();
      this.removeSetFromCurrentCards(this.state.selectedCards);
      this.unselectAllCards();

      if (this.state.currentCards.length < BOARD_SIZE) {
        this.addThreeCards();
      }
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
        <Card selected={isSelected} onSelectCard={handleSelectCard} id={card.id} properties={card} />
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
        <StatusInfo>
          <Timer timeElapsed={this.state.timeElapsed}/>
          <p>Sets: {this.state.sets.length}</p>
          <p>Attempts: {this.state.attempts}</p>
          <p>Cards left: {this.getNumberOfCards()}</p>
        </StatusInfo>
        <RestartButton onClick={this.startGame} />
        <Help>
          <button>View instructions</button>
          <button onClick={this.addThreeCards}>Add more cards</button> 
          <button>Give me a hint</button>
        </Help>
      </div>
    );
  }
}

export default Game;