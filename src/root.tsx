import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';

const Root = () => {
  return (
    <Router>
      <Home path="/*" />
    </Router>
  );
};

export default Root;
