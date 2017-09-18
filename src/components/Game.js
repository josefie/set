import React, { Component } from 'react';
import Board from './Board.js';
import Timer from './Timer.js';

const CATEGORIES = {
  numbers: [1, 2, 3],
  colors: ['red', 'green', 'yellow'],
  textures: ['solid', 'empty', 'granular'],
  shapes: ['rectangle', 'oval', 'wave']
};

const cards = createCards();

function getRandomIndex() {
  return Math.floor(Math.random() * cards.length);
}

function getRandomCards(number) {
  let nextCards = [];

  for (var i = 0; i < number; i++) {
    let removedCard = cards.splice(getRandomIndex(), 1)[0];
    nextCards.push(removedCard);
    console.log(cards.length + ' cards left!');
  }
  
  return nextCards;
}

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

  console.log(cards);
  return cards;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.currentCards = getRandomCards(12);
  }

  render() {
    return (
      <div className="Game">
        <Board cards={this.currentCards} />
        <Timer timestamp={new Date()} />
      </div>
    );
  }
}

export default Game;