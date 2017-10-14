import React, { Component } from 'react';

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