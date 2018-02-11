import React from 'react';

import Section from './Section';
import Card from './Card';
import Timer from './Timer';
import Message from './Message';
import ShapeDefs from './ShapeDefs';
import Toolbar from './Toolbar';
import CollectedSetsModal from './CollectedSetsModal';
import InstructionsModal from './InstructionsModal';
import Button from './Button';

import CardDeck from '../helper/CardDeck';
import CATEGORIES from '../helper/Categories';
import Combinator from '../helper/Combinator';
import STATUS from '../helper/Status';

import '../styles/base/Base.css';
import '../styles/layout/Board.css';
import '../styles/components/Header.css';
import '../styles/components/Footer.css';
import '../styles/components/GameStatus.css';
import '../styles/helper/Helper.css';
import '../styles/font/fontello/css/fontello.css';

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

class Game extends React.Component {

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
      status: STATUS.POSITIVE,
      highlightedCards: [],
      instructionsModalIsOpen: true,
      collectedSetsModalIsOpen: false
    };

    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.startGame = this.startGame.bind(this);
    this.addThreeCards = this.addThreeCards.bind(this);
    this.giveHint = this.giveHint.bind(this);
    this.openInstructions = this.openInstructions.bind(this);
    this.openCollectedSets = this.openCollectedSets.bind(this);
    this.closeModalCallback = this.closeModalCallback.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCards.length === SET_SIZE) {
      let possibleSet = this.state.selectedCards;

      if (this.doCardsMatch(possibleSet)) {
        this.showMessage('Great! That\'s a set!', STATUS.POSITIVE);
        let collectedSet = [];
        for (let i = 0; i < SET_SIZE; i++) {
          let card = this.getCardById(possibleSet[i]);
          collectedSet.push(<Card id={card.id} properties={card} />);
        }
        this.addSet(collectedSet);
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
        this.showMessage('Nope, sorry, that\'s not a set. Try again!', STATUS.NEGATIVE);
        this.increaseAttemptsCounter();
        this.unselectAllCards();
        this.setState({
          highlightedCards: []
        });
      }
    } else if (this.getNumberOfCards() === 0 && prevState.currentCards.length !== this.state.currentCards.length) {
      // look for further sets and finish the game as soon as there are no more sets left 
      if (this.findSets().length === 0) {
        this.finishGame();
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
        currentCards: this.getRandomCards(BOARD_SIZE),
        selectedCards: [],
        sets: [],
        attempts: 0,
        timeElapsed: 0,
        message: "Good luck!",
        status: STATUS.POSITIVE,
        highlightedCards: []
      });
    });

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => this.tickTimer(), 1000);
  }

  finishGame() {
    clearInterval(this.interval);

    const attempts = this.state.attempts;
    const numberOfSets = this.state.sets.length;
    const averageTime = this.state.timeElapsed / this.state.sets.length;
    let message = 'Great, you finished the game! You needed ' 
      + attempts + ' attempt' + (attempts > 1 ? 's' : '') + ' to find ' 
      + numberOfSets + ' set' + (numberOfSets > 1 ? 's' : '') + '. Your average time to find one set was ' 
      + averageTime + ' seconds.';
    
    this.showMessage(message, STATUS.POSITIVE);
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

  findSets() {
    let combinations = Combinator.getAllCombinations(this.state.currentCards, SET_SIZE);
    let setsInCurrentCards = [];

    for(let i = 0; i < combinations.length; i++) {
      if (this.doCardsMatch(combinations[i])) {
        setsInCurrentCards.push(combinations[i]);
      }
    }

    return setsInCurrentCards;
  }

  giveHint() {
    let setsInCurrentCards = this.findSets();
    let numberOfSetsFound = setsInCurrentCards.length;

    if (numberOfSetsFound > 0) {
      // only highlight the first two card of a single set for now
      let randomSetFound = setsInCurrentCards[getRandomIndex(setsInCurrentCards.length)];

      this.setState({
        highlightedCards: [randomSetFound[0], randomSetFound[1]]
      });
      
      this.showMessage('Have a closer look at card ' + this.getPositionInCurrentCards(randomSetFound[0]) + ' and card ' + this.getPositionInCurrentCards(randomSetFound[1]), STATUS.NEUTRAL);
    } else if (this.getNumberOfCards() > 0) {
      this.setState({
        highlightedCards: []
      });
      this.showMessage("Hmm... you're right, there are no more sets. Here are three more cards for you!", STATUS.NEUTRAL);
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

    if (nextCards.length > 0) {
      this.setState(function(prevState) {
        return {
          currentCards: prevState.currentCards.concat(nextCards)
        };
      }, function() {
        document.getElementById('card-' + nextCards[0].id).focus();
      });
    }
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

  showMessage(message, type) {
    this.setState({
      message: message,
      status: type
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
    let currentCards = this.state.currentCards.slice();

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

  openInstructions() {
    this.setState({instructionsModalIsOpen: true});
  }
  
  openCollectedSets() {
    this.setState({collectedSetsModalIsOpen: true});
  }

  closeModalCallback() {
    this.setState({
      collectedSetsModalIsOpen: false,
      instructionsModalIsOpen: false
    });
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
    
    const toolbarActions = [
      <Button key={0} title="Instructions" action={this.openInstructions} modifiers={['inline', 'icon']} icon="info-circled" expanded={this.state.instructionsModalIsOpen}/>,
      <Button key={1} title="Give me a hint" action={this.giveHint} modifiers={['inline', 'icon']} icon="help-circled" />,
      <Button key={2} title="Add more cards" action={this.addThreeCards} modifiers={['inline', 'icon']} icon="plus-circled" />,
      <Button key={3} title="New game" action={this.startGame} modifiers={['inline', 'icon', 'primary']} icon="cw" />
    ];
    
    return (
      <div>
        <a href="#main" className="visible-on-focus">Skip to main content</a>
        <header className="app-header">
          <h1>Set</h1>
          <Toolbar actions={toolbarActions}/>
        </header>
        <main id="main">
          <div className="container">
            <div className="game-status">
              <Section>
                <h2>
                  <Timer timeElapsed={this.state.timeElapsed}/> 
                </h2>
                <p>
                  <span>Sets: {this.state.sets.length}</span>
                  {this.state.sets.length > 0 
                    ? <Button title="View" modifiers={['link', 'inline']} action={this.openCollectedSets} expanded={this.state.collectedSetsModalIsOpen}/> 
                    : null}
                </p>
                <p>Attempts: {this.state.attempts}</p>
                <p>Cards left: {this.getNumberOfCards()}</p>
              </Section>
            </div>
            <ShapeDefs/>
            <div id="board" className="board" tabIndex="-1">
              <Message message={this.state.message} type={this.state.status}/>
              <ul>
                {cards}
              </ul>
            </div>
          </div>
        </main>
        <CollectedSetsModal isOpen={this.state.collectedSetsModalIsOpen} onClose={this.closeModalCallback} collectedSets={this.state.sets} />
        <InstructionsModal isOpen={this.state.instructionsModalIsOpen} onClose={this.closeModalCallback} />
        <footer role="contentinfo" className="app-footer">
          <p>Set was invented by Marsha J. Falco in 1974 and published by <a href="https://www.setgame.com/">Set Enterprises</a> in 1991.</p>
          <p>This app was designed and developed by Josefie Zynga.</p>
        </footer>
      </div>
    );
  }
}

export default Game;