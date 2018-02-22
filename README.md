# Set

You can find the app here: http://josefie.github.io/set

## About the project

This is a private project, which I developed as an exercise while learning React. I wanted to do something a bit more interesting than the notorious todo list app so I decided for a card game called "Set", which is one of my favourite games and I thought was fun to implement.

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[Here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) you will find some information on how to perform common tasks.

The most imporant ones are:

- `npm install` - Installs all dependencies.
- `npm start` - Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
- `npm run build` - Builds the app for production to the build folder.
- `npm deploy` - Pushes all changes to the gh-pages branch and deploys the update to http://josefie.github.io/set.

## Directory structure

The main code is located in the `src/` directory and contains mainly the following sources:

```
src/
|__ components/
    |__ Button.js             | A simple button with different style variations.
    |__ Card.js               | A single card.
    |__ CollectedSetsModal.js | A modal displaying all sets collected by the user.
    |__ Game.js               | The main app container including most of the game logic.
    |__ InstructionsModal.js  | A modal displaying the game instructions.
    |__ Message.js            | A status message.
    |__ Modal.js              | A modal window.
    |__ Pattern.js            | An SVG pattern used to display the texture of a shape.
    |__ Section.js            | A simple section with a title.
    |__ Shape.js              | An SVG with a specified shape, color and texture. 
    |__ ShapeDefs.js          | The SVG shape definitions.
    |__ Timer.js              | A timer that counts up seconds and formats it to a time string.
    |__ Toolbar.js            | A toolbar of actions.
|__ helper/
    |__ CardDeck.js           | Creates a deck of 81 unique cards.
    |__ Categories.js         | Constant of all available categories and category-values.
    |__ Combinator.js         | Gets all possible combinations for a given array of options.
    |__ ElementsFocusable.js  | Constant of focusable HTML elements.
    |__ KeyCodes.js           | Constant of used key codes.
    |__ Status.js             | Constant of status message codes.
|__ styles/
    |__ base/                 | Basic styling on HTML element level.
    |__ components/           | Main styling for the components.
    |__ font/                 | Font files and stylesheets.
    |__ helper/               | Global helper classes.
    |__ layout/               | Global layout.
    |__ settings/             | Configuration variables, like breakpoints and colors.
```

## The game

Set is a real-time card game designed by Marsha Falco in 1974 and published by [Set Enterprises](https://www.setgame.com/) in 1991.

### The deck

The deck consists of 81 cards varying in four features:

- number (one, two, or three)
- shape (rectangle, squiggle, or oval)
- texture (solid, granular, or empty)
- color (red, green, or yellow)

Each possible combination of features (e.g. a card with three solid green rectangles) appears precisely once in the deck.

### What is a set?

A set consists of three cards satisfying all of these conditions:

- They all have the same number or have three different numbers.
- They all have the same shape or have three different shapes.
- They all have the same texture or have three different textures.
- They all have the same color or have three different colors.

For example, these three cards form a set:

- two solid red ovals
- two green granular ovals
- two yellow empty ovals

Given any two cards from the deck, there is one and only one other card that forms a set with them.

### Goal

The goal is to find as many sets as you can until there are no more sets in the deck.