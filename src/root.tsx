import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Basket from './views/Basket';

const Root = () => {
  return (
    <Router>
      <Home path="/*" />
      <Basket path="/basket" />
    </Router>
  );
};

export default Root;
