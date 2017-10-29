import React from 'react';

import '../styles/components/Message.css';

const Message = function({message, type}) {
  return(
    <div className={'message message--' + type} aria-live="assertive">
      {message}
    </div>
  );
};

export default Message;