import CATEGORIES from './Categories.js';

class CardHelper {

  constructor() {
    this.cards = this.create();
  }

  create() {
    let cards = [];
    let count = 0;

    for (var number = 0; number < 3; number++) {
      for (var color = 0; color < 3; color++) {
        for (var texture = 0; texture < 3; texture++) {
          for (var shape = 0; shape < 3; shape++) {
            let card = {};
            card.id = count++;
            card.number = CATEGORIES.number[number];
            card.color = CATEGORIES.color[color];
            card.texture = CATEGORIES.texture[texture];
            card.shape = CATEGORIES.shape[shape];
            cards.push(card);

            // TODO: überschneidungen auslassen
            // (3*3*3*3) - (3*4) = 69
          }
        }
      }
    }

    return cards;
  }

  get(id) {
    const index = this.cards.map((card) => card.id).indexOf(id);
    return this.cards[index];
  }
}

export default CardHelper;