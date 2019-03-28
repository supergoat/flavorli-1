import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Meals from './views/Meals';
import Order from './views/Order';
import Details from './views/Details';
import Account from './views/Account';
import CheckOut from './views/CheckOut';
import Receipt from './views/Receipt';
import Orders from './views/Orders';
import Addresses from './views/Address';
import Restaurants from './views/Restaurants';

const Root = () => {
  return (
    <Router>
      <Home path="/" />
      <Meals path="/meals/*" />
      <CheckOut path="/checkout" />
      <Order path="/order/:id" />
      <Account path="/account" />
      <Details path="/details" />
      <Addresses path="/address" />
      <Orders path="/orders" />
      <Receipt path="/receipt/:id" />
      <Restaurants path="/restaurants" />
    </Router>
  );
};

export default Root;
