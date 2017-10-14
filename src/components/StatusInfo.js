import React from 'react';

import Timer from './Timer.js';

const StatusInfo = function({sets, attempts, cardsLeft}) {

  return (
    <section>
      <h2>Your game</h2>
      <Timer timestamp={new Date()} />
      <p>Sets: {sets.length}</p>
      <p>Attempts: {attempts}</p>
      <p>Cards left: {cardsLeft}</p>
    </section>
  );
}

export default StatusInfo;