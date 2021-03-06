import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Card from './Card';

const InstructionsModal = function({isOpen, onClose}) {
  return (
    <Modal title="Instructions" id="instructions" isOpen={isOpen} onClose={onClose}>
      <p>Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991.</p>

      <h3>The deck</h3>
      <p>The deck consists of 81 cards varying in four features:</p>
      <ul>
        <li>number (one, two, or three)</li>
        <li>shape (rectangle, squiggle, or oval)</li>
        <li>texture (solid, granular, or empty)</li>
        <li>color (red, green, or yellow)</li>
      </ul>
      <p>Each possible combination of features (e.g. a card with three solid green rectangles) appears precisely once in the deck.</p>

      <h3>What is a set?</h3>
      <p>A set consists of three cards satisfying all of these conditions:</p>
      <ul>
        <li>They all have the same number or have three different numbers.</li>
        <li>They all have the same shape or have three different shapes.</li>
        <li>They all have the same texture or have three different textures.</li>
        <li>They all have the same color or have three different colors.</li>
      </ul>
      <p>For example, these three cards form a set:</p>
      <ul className="flex-list">
        <li><Card properties={{number: 2, color: 'red', texture: 'solid', shape: 'oval'}} id="example-1"/></li>
        <li><Card properties={{number: 2, color: 'green', texture: 'granular', shape: 'oval'}} id="example-2"/></li>
        <li><Card properties={{number: 2, color: 'yellow', texture: 'empty', shape: 'oval'}} id="example-3"/></li>
      </ul>
      <p>Given any two cards from the deck, there is one and only one other card that forms a set with them.</p>

      <h3>Goal</h3>
      <p>The goal is to find as many sets as you can until there are no more sets in the deck.</p>
      
      <p>
        You can find <a href="https://www.setgame.com/instructions">full instructions (in different languages)</a> on the Set Enterprises website
        or read more about <a href="https://en.wikipedia.org/wiki/Set_(game)">Set on Wikipedia</a>.
      </p>
    </Modal>
  );
}

InstructionsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default InstructionsModal;