import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Toolbar.css';

class Toolbar extends React.Component {
  
  render() {
    return (
      <div className="toolbar">
        {this.props.actions}
      </div>
    );
  }
}

Toolbar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
}

export default Toolbar;