import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Basket from './views/Basket';
import Account from './views/Account';
import CheckOut from './views/CheckOut';

const Root = () => {
  return (
    <Router>
      <Home path="/*" />
      <Basket path="/basket" />
      <Account path="/account" />
      <CheckOut
        path="/checkout"
        account={{
          address: 'string',
          tel: 'string',
        }}
        orderTotal={10}
      />
    </Router>
  );
};

export default Root;
