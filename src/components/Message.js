import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Message.css';

const Message = function({message, type}) {
  return(
    <div className={'message message--' + type} aria-live="assertive">
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['positive', 'negative'])
}

export default Message;