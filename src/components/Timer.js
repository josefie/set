import React from 'react';
import PropTypes from 'prop-types';

const Timer = function({timeElapsed}) {
  let datetime = new Date(null);
  datetime.setSeconds(timeElapsed);
  let timeString = datetime.toLocaleTimeString();

  return (
    <div>
      Time: <time dateTime={datetime}>{timeString.slice(3, timeString.length)}</time>
    </div>
  );
}

Timer.propTypes = {
  timeElapsed: PropTypes.number
};

Timer.defaultProps = {
  timeElapsed: 0
};

export default Timer;