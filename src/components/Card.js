import React, {Component} from 'react';

import Shape from './Shape.js';

import '../styles/components/Card.css';

class Card extends Component {

  constructor(props) {
    super(props);

    this.selectCard = this.selectCard.bind(this);
  }

  selectCard() {
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
      <button className={'card' + (this.props.highlighted ? ' card--highlighted' : '')} aria-pressed={this.props.selected} onClick={this.selectCard}>
        {this.renderShapes()}
        <div className="visually-hidden">
          {this.getHumanReadableName()}
        </div>
      </button>
    );
  }
}

export default Card;