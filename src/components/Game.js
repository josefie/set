import React, { Component } from 'react';
import Board from './Board.js';
import Timer from './Timer.js';

const CATEGORIES = {
  numbers: [1, 2, 3],
  colors: ['red', 'green', 'yellow'],
  shapes: ['rectangle', 'oval', 'wave'],
  textures: ['solid', 'empty', 'granular']
};

function createCards() {

  return [
    {
      id: 1,
      number: CATEGORIES.numbers[0],
      color: CATEGORIES.colors[0],
      shape: CATEGORIES.shapes[0],
      texture: CATEGORIES.textures[0]
    },
    {
      id: 2,
      number: CATEGORIES.numbers[1],
      color: CATEGORIES.colors[1],
      shape: CATEGORIES.shapes[1],
      texture: CATEGORIES.textures[1]
    },
    {
      id: 3,
      number: CATEGORIES.numbers[2],
      color: CATEGORIES.colors[2],
      shape: CATEGORIES.shapes[2],
      texture: CATEGORIES.textures[2]
    },
    {
      id: 4,
      number: CATEGORIES.numbers[1],
      color: CATEGORIES.colors[2],
      shape: CATEGORIES.shapes[2],
      texture: CATEGORIES.textures[2]
    },
    {
      id: 5,
      number: CATEGORIES.numbers[1],
      color: CATEGORIES.colors[1],
      shape: CATEGORIES.shapes[2],
      texture: CATEGORIES.textures[2]
    },
    {
      id: 6,
      number: CATEGORIES.numbers[1],
      color: CATEGORIES.colors[1],
      shape: CATEGORIES.shapes[1],
      texture: CATEGORIES.textures[2]
    }
  ];
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.cards = createCards();
  }

  render() {
    return (
      <div className="Game">
        <Board cards={this.cards} />
        <Timer timestamp={new Date()} />
      </div>
    );
  }
}

export default Game;