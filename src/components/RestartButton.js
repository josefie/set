import React, { Component } from 'react';

class RestartButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Restart
      </button>
    );
  }
}

export default RestartButton;