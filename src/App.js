import React from 'react';
import { Link } from 'found';

export default ({ children }) => (
  <div>
    <h1><Link to="/">The App</Link></h1>
    <div>
      {children}
    </div>
  </div>
);
