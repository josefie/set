import React from 'react';

import '../styles/Message.css';

const Message = function({message, type}) {
  return(
    <div className={'Message Message--' + type} aria-live="assertive">
      {message}
    </div>
  );
};

export default Message;