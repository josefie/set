import React from 'react';

const Timer = function({timeElapsed}) {
  let datetime = new Date(null);
  datetime.setSeconds(timeElapsed);
  let timeString = datetime.toLocaleTimeString();

  return (
    <time dateTime={datetime}>{timeString.slice(3, timeString.length)}</time>
  );
}

Timer.defaultProps = {
  timeElapsed: 0
};

export default Timer;