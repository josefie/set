import React from 'react';

const StatusInfo = function({children}) {

  return (
    <section>
      <h2>Your game</h2>
      {children}
    </section>
  );
}

export default StatusInfo;