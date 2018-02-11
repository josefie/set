import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Button.css';

const BUTTON_STYLES = ['primary', 'inline', 'link', 'icon'];

const Button = function({title, type, action, modifiers = [], icon, expanded}) {

  const isPrimary = modifiers.indexOf('primary') !== -1;
  const hasIcon = !!icon;

  let classes = 'button';

  modifiers.forEach(modifier => {
    classes += ' button--' + modifier;
  });
  
  return (
    <button className={classes} type={type || 'button'} onClick={action} aria-expanded={expanded}>
      {hasIcon ? <span className={'icon-' + icon}></span> : null}
      <span className={hasIcon ? (isPrimary ? 'visible-from-xs-screen' : 'visible-from-m-screen') : ''}>{title}</span>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  action: PropTypes.func,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(BUTTON_STYLES)),
  icon: PropTypes.string,
  expanded: PropTypes.bool
}

export default Button;