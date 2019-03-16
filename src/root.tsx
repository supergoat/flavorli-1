import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Basket from './views/Basket';
import Account from './views/Account';

const Root = () => {
  return (
    <Router>
      <Home path="/*" />
      <Basket path="/basket" />
      <Account path="/account" />
    </Router>
  );
};

export default Root;
