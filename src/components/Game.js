import React, { Component } from 'react';
import Board from './Board.js';
import Timer from './Timer.js';
import StatusBar from './StatusBar.js';
import RestartButton from './RestartButton.js';
import Cards from '../Cards.js';

const CARDS = Cards.create();

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