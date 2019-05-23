import React from 'react';
import {Router} from '@reach/router';
// import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';

import Basket from './views/Basket';
import Details from './views/Details';
import Account from './views/Account';
import Receipt from './views/Receipt';
import Orders from './views/Orders';
import Addresses from './views/Address';
import Restaurants from './views/Restaurants';
import Restaurant from './views/Restaurant';

const Root = () => {
  return (
    <Router>
      <Register path="/register" />
      <Login path="/login" />

      {/* <Home path="/" /> */}

      <Restaurants path="/" />
      <Basket path="/basket" />
      <Account path="/account" />
      <Details path="/details" />
      <Addresses path="/address" />
      <Orders path="/orders" />
      <Receipt path="/receipt/:receiptId" />
      <Restaurant path="/restaurant/:restaurantId/*" />
    </Router>
  );
};

export default Root;
