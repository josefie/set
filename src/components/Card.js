import React, {Component} from 'react';

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

  renderShapes() {
    let shapes = [];
    let x = 0;
    for (let i = 0; i < this.props.properties.number; i++) {
      shapes.push(<use x={x} y="0" width="170" height="400" href={'#' + this.props.properties.shape} key={i}/>);
      x += 200;
    }

    return shapes;
  }

  render() {

    return (
      <button className={'card' + (this.props.highlighted ? ' card--highlighted' : '')} aria-pressed={this.props.selected} onClick={this.selectCard}>
        <strong>{this.props.id}</strong>
        <svg viewBox="0 0 630 400" className={'shape shape--' + this.props.properties.color + ' shape--' + this.props.properties.texture}>
          {this.renderShapes()}
        </svg>
        
        <div className="visually-hidden">
          <div>{this.props.properties.number}</div>
          <div>{this.props.properties.color}</div>
          <div>{this.props.properties.texture}</div>
          <div>{this.props.properties.shape + (this.props.properties.number > 1 ? 's' : '')}</div>
        </div>
      </button>
    );
  }
}

export default Card;