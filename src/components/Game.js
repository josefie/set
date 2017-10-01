import React, { Component } from 'react';
import Timer from './Timer.js';
import StatusBar from './StatusBar.js';
import RestartButton from './RestartButton.js';
import CardHelper from '../Cards.js';
import Card from './Card.js';
import CATEGORIES from '../Categories.js';

const CARD_HELPER = new CardHelper();
const SET_SIZE = 3;

function allDifferent(card1, card2, card3) {
  if (card1 === card2 || card2 === card3 || card1 === card3) {
    return false;
  }
  return true;
}

function allSame(card1, card2, card3) {
  return card1 === card2 && card2 === card3;
}

class Game extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      currentCards: [],
      selectedCards: [],
      sets: [],
      tries: 0
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentWillMount() {
    this.restartGame();
  }

  componentDidUpdate() {
    this.checkMatches();
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

  getNumberOfCards() {
    return this.cards.length;
  }

  getNumberOfSets() {
    return this.state.sets.length;
  }

  restartGame() {
    this.cards = CARD_HELPER.cards.slice();

    this.setState({
      currentCards: this.getRandomCards(12)
    });
  }

  checkMatches() {
    if (this.state.selectedCards.length === SET_SIZE) {

      let isSet = true;
      
      let card1 = CARD_HELPER.get(this.state.selectedCards[0]);
      let card2 = CARD_HELPER.get(this.state.selectedCards[1]);
      let card3 = CARD_HELPER.get(this.state.selectedCards[2]);

      Object.keys(CATEGORIES).forEach(function(category) {
        let categoryMatches = false;

        if (allSame(card1[category], card2[category], card3[category])) {
          categoryMatches = true;
        } else if (allDifferent(card1[category], card2[category], card3[category])) {
          categoryMatches = true;
        } 

        if (categoryMatches === false) {
          isSet = false;
        }

      });

      if (isSet) {
        console.log('SET!');

        let sets = this.state.sets;
        sets.push(this.state.selectedCards);

        this.setState(function(prevState) {
          return {
            selectedCards: [],
            sets: sets,
            tries: prevState.tries + 1
          }
        });

      } else {
        console.log('No set :(');

        this.setState(function(prevState) {
          return {
            selectedCards: [],
            tries: prevState.tries + 1
          }
        });
      }
    }
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
        <StatusBar cardsLeft={this.getNumberOfCards()} sets={this.getNumberOfSets()} tries={this.state.tries} />
        <RestartButton onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;