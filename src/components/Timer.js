import React from 'react';
import PropTypes from 'prop-types';

function addLeadingZeros(number) {
  return ('0' + number).slice(-2);
}

function formatTime(seconds = 0, minutes = 0, hours = 0) {
  let timeString = "";

  if (hours > 0) {
    timeString += addLeadingZeros(hours) + ':';
  }

  timeString += addLeadingZeros(minutes) + ':' + addLeadingZeros(seconds);

  return timeString;
}

class Timer extends React.Component {

  render() {
    let hours = Math.floor(this.props.timeElapsed / 3600);
    let secondsLeft = this.props.timeElapsed % 3600;
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    return (
      <div>
        Time: {formatTime(seconds, minutes, hours)}
      </div>
    );
  }
}

Timer.propTypes = {
  timeElapsed: PropTypes.number
};

Timer.defaultProps = {
  timeElapsed: 0
};

export default Timer;