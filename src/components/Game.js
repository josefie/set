import React, { Component } from 'react';
import Board from './Board.js';
import Timer from './Timer.js';
import StatusBar from './StatusBar.js';
import RestartButton from './RestartButton.js';

const CATEGORIES = {
  numbers: [1, 2, 3],
  colors: ['red', 'green', 'yellow'],
  textures: ['solid', 'empty', 'granular'],
  shapes: ['rectangle', 'oval', 'wave']
};

const CARDS = createCards();

function createCards() {
  let cards = [];
  let count = 0;

  for (var number = 0; number < 3; number++) {
    for (var color = 0; color < 3; color++) {
      for (var texture = 0; texture < 3; texture++) {
        for (var shape = 0; shape < 3; shape++) {
          let card = {};
          card.id = count++;
          card.number = CATEGORIES.numbers[number];
          card.color = CATEGORIES.colors[color];
          card.texture = CATEGORIES.textures[texture];
          card.shape = CATEGORIES.shapes[shape];
          cards.push(card);

          // TODO: überschneidungen auslassen
          // (3*3*3*3) - (3*4) = 69
        }
      }
    }
  }

  return cards;
}

class Game extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentCards: [],
      sets: []
    };

    this.restartGame = this.restartGame.bind(this);
  }

  componentWillMount() {
    this.restartGame();
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

  restartGame() {
    this.cards = CARDS.slice();

    this.setState({
      currentCards: this.getRandomCards(12)
    });
  }

  render() {
    return (
      <div className="Game">
        <Board cards={this.state.currentCards} />
        <Timer timestamp={new Date()} />
        <StatusBar cardsLeft={this.getNumberOfCards()} sets={this.getNumberOfSets()} />
        <RestartButton onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;