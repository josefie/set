import React, { Component } from 'react';

import StatusInfo from './StatusInfo.js';
import RestartButton from './RestartButton.js';
import Help from './Help.js';
import Card from './Card.js';
import Timer from './Timer.js';
import Message from './Message.js';
import Shapes from './Shapes.js';

import CardDeck from '../helper/CardDeck.js';
import CATEGORIES from '../helper/Categories.js';
import Combinator from '../helper/Combinator.js';

import '../styles/tools/Helper.css';
import '../styles/components/Button.css';

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

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
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
      timeElapsed: 0,
      message: "Good luck!"
    };

    this.highlightedSet = [];

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.startGame = this.startGame.bind(this);
    this.addThreeCards = this.addThreeCards.bind(this);
    this.giveHint = this.giveHint.bind(this);
  }

  componentDidMount() {
    this.startGame();
    this.interval = setInterval(() => this.tickTimer(), 1000);
  }

  componentDidUpdate() {
    if (this.state.selectedCards.length === SET_SIZE) {
      let possibleSet = this.state.selectedCards;

      if (this.doCardsMatch(possibleSet)) {
        this.showMessage('Great! That\'s a set!', true);
        this.addSet(possibleSet);
        this.increaseAttemptsCounter();
        this.removeSetFromCurrentCards(possibleSet);
        this.unselectAllCards();

        if (this.state.currentCards.length < BOARD_SIZE) {
          this.addThreeCards();
        }
      } else {
        this.showMessage('Nope, sorry...', false);
        this.increaseAttemptsCounter();
        this.unselectAllCards();
      }
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
        timeElapsed: 0,
        message: "Good luck!"
      });
    });
  }

  finishGame() {
    this.showMessage('Game finished!', true);
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

  giveHint() {
    let combinations = Combinator.getAllCombinations(this.state.currentCards, SET_SIZE);
    let setsInCurrentCards = [];
    this.highlightedSet = [];

    for(let i = 0; i < combinations.length; i++) {
      if (this.doCardsMatch(combinations[i])) {
        setsInCurrentCards.push(combinations[i]);
      }
    }

    // only highlight a single set found for now
    if (setsInCurrentCards.length) {
      this.highlightedSet = setsInCurrentCards[getRandomIndex(setsInCurrentCards.length)];
    } else if (this.getNumberOfCards > 0) {
      this.showMessage("I couldn't find any set, either! Here are three more cards for you!");
      this.addThreeCards();
    } else {
      this.finishGame();
    }
  }

  getRandomCards(number) {
    let nextCards = [];
    let cardsLeft = this.state.cards;

    for (var i = 0; i < number && cardsLeft.length > 0; i++) {
      let removedCard = cardsLeft.splice(getRandomIndex(cardsLeft.length), 1)[0];
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

  doCardsMatch(possibleSet) {
    let cards = possibleSet.map((id) => this.getCardById(id));

    return Object.keys(CATEGORIES).every((category) => {
      let categoryValues = cards.map((card) => card[category]);
      return this.isCategoryMatch(categoryValues);
    });
  }

  showMessage(message, isPositive) {
    let type = isPositive ? 'positive' : 'negative';

    this.setState({
      message: message,
      type: type
    });
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
    const highlightedSet = this.highlightedSet;

    const cards = this.state.currentCards.map(function(card) {
      let isSelected = (selectedCards.indexOf(card.id)) !== -1;
      let isHighlighted = (highlightedSet.indexOf(card.id)) !== -1;

      return (
      <li className="CardWrapper" key={card.id}>
        <Card selected={isSelected} highlighted={isHighlighted} onSelectCard={handleSelectCard} id={card.id} properties={card} />
      </li>
      );
    });

    return (
      <div className="Game">
        <Shapes/>
        <div className="Board">
          <ul>
            {cards}
          </ul>
        </div>
        <div className="Sidebar">
          <Message message={this.state.message} type={this.state.type}/>
          <StatusInfo>
            <p>Sets: {this.state.sets.length}</p>
            <Timer timeElapsed={this.state.timeElapsed}/>
            <p>Attempts: {this.state.attempts}</p>
            <p>Cards left: {this.getNumberOfCards()}</p>
          </StatusInfo>
          <RestartButton onClick={this.startGame} />
          <Help>
            <button className="button">View instructions</button>
            <button className="button" onClick={this.addThreeCards}>Add more cards</button> 
            <button className="button" onClick={this.giveHint}>Give me a hint</button>
          </Help>
        </div>
      </div>
    );
  }
}

export default Game;