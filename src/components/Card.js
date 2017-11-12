import React from 'react';
import PropTypes from 'prop-types';

import Shape from './Shape.js';
import CATEGORIES from '../helper/Categories.js';

import '../styles/components/Card.css';

class Card extends React.Component {

  constructor(props) {
    super(props);

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
    if (typeof this.props.onSelectCard === 'undefined') {
      return false;
    }
    this.props.onSelectCard(this);
  }

  isSelected() {
    return this.props.selected;
  }

  getId() {
    return this.props.id;
  }

  getHumanReadableName() {
    return (
      this.props.properties.number + ' '
      + this.props.properties.color + ' ' 
      + this.props.properties.texture + ' '
      + this.props.properties.shape 
      + (this.props.properties.number > 1 ? 's' : '')
    );
  }

  renderShapes() {
    let shapes = [];

    for (let i = 0; i < this.props.properties.number; i++) {
      shapes.push(<Shape shape={this.props.properties.shape} color={this.props.properties.color} texture={this.props.properties.texture} key={i}/>);
    }

    return shapes;
  }

  render() {

    return (
      <button id={'card-' + this.props.id} className={'card' + (this.props.highlighted ? ' card--highlighted' : '')} aria-pressed={this.props.selected} onClick={this.selectCard}>
        {this.renderShapes()}
        <div className="visually-hidden">
          {this.getHumanReadableName()}
        </div>
      </button>
    );
  }
}

Card.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  properties: PropTypes.shape({
    number: PropTypes.oneOf(CATEGORIES.number),
    color: PropTypes.oneOf(CATEGORIES.color),
    texture: PropTypes.oneOf(CATEGORIES.texture),
    shape: PropTypes.oneOf(CATEGORIES.shape)
  }).isRequired,
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
  onSelectCard: PropTypes.func,
};

export default Card;