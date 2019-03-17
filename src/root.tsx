import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Basket from './views/Basket';
import Details from './views/Details';
import Account from './views/Account';
import CheckOut from './views/CheckOut';
import Order from './views/Order';
import Orders from './views/Orders';
import Addresses from './views/Address';

const Root = () => {
  return (
    <Router>
      <Home path="/*" />
      <CheckOut
        path="/checkout"
        account={{
          address: 'De Beauvoir Road, 7 fermain Court North, London, N15SX',
          tel: '07960778401',
        }}
        orderTotal={10}
      />
      <Basket path="/basket" />
      <Account path="/account" />
      <Details path="/details" />
      <Addresses path="/address" />
      <Orders path="/orders" />
      <Order path="/order/:id" />
    </Router>
  );
};

export default Root;
