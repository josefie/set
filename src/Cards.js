const CATEGORIES = {
  numbers: [1, 2, 3],
  colors: ['red', 'green', 'yellow'],
  textures: ['solid', 'empty', 'granular'],
  shapes: ['rectangle', 'oval', 'wave']
};

class Cards {

  static create() {
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
}

export default Cards;