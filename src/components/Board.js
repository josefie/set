import React, {Component} from 'react';
import Card from './Card.js';

class Board extends Component {

  render() {
    const cards = this.props.cards.map((card) =>
      <li>
        <Card properties={card} key={card.id}/>
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