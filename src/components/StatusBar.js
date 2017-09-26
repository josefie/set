import React, { Component } from 'react';

class StatusBar extends Component {
  render() {
    return (
      <div>
        <p>Cards left: {this.props.cardsLeft}</p>
        <p>Sets: {this.props.sets}</p>
      </div>
    );
  }
}

export default StatusBar;