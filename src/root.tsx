import React from 'react';
import {Router} from '@reach/router';
// import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';

import Order from './views/Order';
import Details from './views/Details';
import Account from './views/Account';
import CheckOut from './views/CheckOut';
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
      <CheckOut path="/checkout" />
      <Order path="/order" />
      <Account path="/account" />
      <Details path="/details" />
      <Addresses path="/address" />
      <Orders path="/orders" />
      <Receipt path="/receipt/:id" />
      <Restaurant path="/restaurant/:restaurantId/*" />
    </Router>
  );
};

export default Root;
