import React from 'react';

const Section = function({title, children}) {

  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default Section;