import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Basket from './views/Basket';
import Account from './views/Account';
import CheckOut from './views/CheckOut';
import Order from './views/Order';

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
      <Order path="/order/:id" />
    </Router>
  );
};

export default Root;
