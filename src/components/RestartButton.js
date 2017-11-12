import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Button.css';

class RestartButton extends React.Component {
  render() {
    return (
      <button className="button button--big" onClick={this.props.onClick}>
        New Game
      </button>
    );
  }
}

RestartButton.propTypes = {
  onClick: PropTypes.func
}

export default RestartButton;