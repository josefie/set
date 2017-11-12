import React from 'react';

import Pattern from './Pattern.js';

import '../styles/components/Shapes.css';

const ShapeDefs = function() {
  return (
    <svg id="shapes" className="shape-defs">
      <defs>
        <Pattern color="red" />
        <Pattern color="green" />
        <Pattern color="yellow" />
      </defs>
      <defs>
        <g id="oval">
          <title>Oval</title>
          <ellipse ry="196" rx="81" cy="200" cx="85"/>
        </g>
        <g id="rectangle">
          <title>Rectangle</title>
          <rect height="392" width="162" y="4" x="4"/>
        </g>
        <g id="squiggle">
          <title>Squiggle</title>
          <path d="m165.939362,49.855892c0.601639,-19.767694 -35.161469,-45.855892 -77.077881,-45.855892c-41.916492,0 -85.635699,28.130356 -85.33208,77.281281c0.303619,49.150848 58.61093,162.479263 52.216208,192.585846c-6.394691,30.106628 -50.982814,39.200348 -51.571049,58.169128c-0.588235,18.968781 30.565449,63.671387 77.055214,63.728424c46.489784,0.057007 84.736107,-32.443359 84.546318,-78.876556c-0.189789,-46.433197 -59.02356,-182.367462 -50.075996,-211.098633c8.947563,-28.731163 49.637627,-36.165878 50.239265,-55.933598z"/>
        </g>
      </defs>
    </svg>
  );
}

export default ShapeDefs;