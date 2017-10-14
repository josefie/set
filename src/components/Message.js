import React from 'react';

const Message = function({message}) {
  return(
    <div aria-live="assertive">
      <p>{message}</p>
    </div>
  );
};

export default Message;