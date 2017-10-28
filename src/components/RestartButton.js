import React, { Component } from 'react';

import '../styles/components/Button.css';

class RestartButton extends Component {
  render() {
    return (
      <button className="button button--big" onClick={this.props.onClick}>
        New Game
      </button>
    );
  }
}

export default RestartButton;