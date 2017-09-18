import React, { Component } from 'react';

class Timer extends Component {

  render() {
    let datetime = new Date(this.props.timestamp);
    return (
      <time datetime="{this.props.timestamp}">{datetime.toLocaleTimeString()}</time>
    );
  }
}

export default Timer;