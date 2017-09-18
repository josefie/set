import React, {Component} from 'react';
import Card from './Card.js';

class Board extends Component {

  render() {
    const cards = this.props.cards.map((card) =>
      <li key={card.id}>
        <Card 
        number={card.number} 
        color={card.color}
        texture={card.texture}
        shape={card.shape} />
      </li>
    );

    return (
      <div>
        <ul>
          {cards}
        </ul>
      </div>
    );
  }
}

export default Board;