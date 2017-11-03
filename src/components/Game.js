import React, { Component } from 'react';

import Section from './Section.js';
import RestartButton from './RestartButton.js';
import Card from './Card.js';
import Timer from './Timer.js';
import Message from './Message.js';
import ShapeDefs from './ShapeDefs.js';
import Modal from './Modal.js';

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
      message: "Good luck!",
      highlightedCards: []
    };

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
        this.setState({
          highlightedCards: []
        });

        if (this.state.currentCards.length < BOARD_SIZE) {
          this.addThreeCards();
        }
      } else {
        this.showMessage('Nope, sorry, that\'s not a set. Try again!', false);
        this.increaseAttemptsCounter();
        this.unselectAllCards();
        this.setState({
          highlightedCards: []
        });
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
        message: "Good luck!",
        highlightedCards: []
      });
    });
  }

  finishGame() {
    const attempts = this.state.attempts;
    const numberOfSets = this.state.sets.length;
    const averageTime = this.state.timeElapsed / this.state.sets.length;
    let message = 'Great, you finished the game! You needed ' 
      + attempts + ' attempt' + (attempts > 1 ? 's' : '') + ' to find ' 
      + numberOfSets + ' set' + (numberOfSets > 1 ? 's' : '') + '. Your average time to find one set was ' 
      + averageTime + ' seconds.';
    
    this.showMessage(message, true);
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

  getPositionInCurrentCards(card) {
    let ids = this.state.currentCards.map((card) => {
      return card.id;
    });

    return ids.indexOf(card) + 1;
  }

  giveHint() {
    let combinations = Combinator.getAllCombinations(this.state.currentCards, SET_SIZE);
    let setsInCurrentCards = [];

    for(let i = 0; i < combinations.length; i++) {
      if (this.doCardsMatch(combinations[i])) {
        setsInCurrentCards.push(combinations[i]);
      }
    }

    let numberOfSetsFound = setsInCurrentCards.length;

    if (numberOfSetsFound > 0) {
      // only highlight the first two card of a single set for now
      let randomSetFound = setsInCurrentCards[getRandomIndex(setsInCurrentCards.length)];

      this.setState({
        highlightedCards: [randomSetFound[0], randomSetFound[1]]
      });
      
      this.showMessage('Have a closer look at card ' + this.getPositionInCurrentCards(randomSetFound[0]) + ' and card ' + this.getPositionInCurrentCards(randomSetFound[1]));
    } else if (this.getNumberOfCards() > 0) {
      this.setState({
        highlightedCards: []
      });
      this.showMessage("I couldn't find any set, either! Here are three more cards for you!");
      this.addThreeCards();
    } else {
      this.setState({
        highlightedCards: []
      });
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
    }, function() {
      document.getElementById('card-' + nextCards[0].id).focus();
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

    document.getElementById('board').focus();
  }

  render() {
    const selectedCards = this.state.selectedCards;
    const handleSelectCard = this.handleSelectCard;
    const highlightedCards = this.state.highlightedCards;

    const cards = this.state.currentCards.map(function(card) {
      let isSelected = (selectedCards.indexOf(card.id)) !== -1;
      let isHighlighted = (highlightedCards.indexOf(card.id)) !== -1;

      return (
      <li className="card-wrapper" key={card.id}>
        <Card selected={isSelected} highlighted={isHighlighted} onSelectCard={handleSelectCard} id={card.id} properties={card} />
      </li>
      );
    });

    return (
      <main>
        <Message message={this.state.message} type={this.state.type}/>
        <div className="container">
          <ShapeDefs/>
          <div id="board" className="board" tabIndex="-1">
            <ul>
              {cards}
            </ul>
          </div>
          <div className="sidebar">
            <Section title="Your game">
              <p>Sets: {this.state.sets.length}</p>
              <Timer timeElapsed={this.state.timeElapsed}/>
              <p>Attempts: {this.state.attempts}</p>
              <p>Cards left: {this.getNumberOfCards()}</p>
            </Section>
            <RestartButton onClick={this.startGame} />
            <Section title="Need help?">
              <Modal title="Instructions" id="instructions">
                <p>
                  Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991. 
                  The deck consists of 81 cards varying in four features: 
                  number (one, two, or three); 
                  shape (rectangle, squiggle, or oval); 
                  texture (solid, granular, or empty); 
                  and color (red, green, or yellow).
                  Each possible combination of features (e.g. a card with three solid green rectangles) appears precisely once in the deck.
                </p>
                <p>
                  A set consists of three cards satisfying all of these conditions:
                </p>
                <ul>
                  <li>They all have the same number or have three different numbers.</li>
                  <li>They all have the same shape or have three different shapes.</li>
                  <li>They all have the same texture or have three different textures.</li>
                  <li>They all have the same color or have three different colors.</li>
                </ul>
                <p>
                  For example, these three cards form a set:
                </p>
                <ul className="flex-list">
                  <li><Card properties={{number: 2, color: 'red', texture: 'solid', shape: 'oval'}}/></li>
                  <li><Card properties={{number: 2, color: 'green', texture: 'granular', shape: 'oval'}}/></li>
                  <li><Card properties={{number: 2, color: 'yellow', texture: 'empty', shape: 'oval'}}/></li>
                </ul>
                <p>
                  Given any two cards from the deck, there is one and only one other card that forms a set with them.
                </p>
                <p>
                  <a href="https://en.wikipedia.org/wiki/Set_(game)">Read "Set" on Wikipedia</a>
                </p>
                <h3>Goal</h3>
                <p>The goal is to find as many sets as you can until there are no more sets in the deck.</p>
              </Modal>
              <button className="button" onClick={this.addThreeCards}>Add more cards</button> 
              <button className="button" onClick={this.giveHint}>Give me a hint</button>
            </Section>
          </div>
        </div>
      </main>
    );
  }
}

export default Game;