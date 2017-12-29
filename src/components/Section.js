import React from 'react';
import PropTypes from 'prop-types';

const Section = function({title, children}) {

  const sectionTitle = title ? <h2>{title}</h2> : null;

  return (
    <section>
      {sectionTitle}
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}

export default Section;