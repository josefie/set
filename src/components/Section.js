import React from 'react';
import PropTypes from 'prop-types';

const Section = function({title, children}) {

  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default Section;