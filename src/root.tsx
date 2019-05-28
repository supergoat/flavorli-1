import React from 'react';
import {Router} from '@reach/router';
// import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Basket from './views/Basket';
import Details from './views/Details';
import Account from './views/Account';
import Order from './views/Order';
import OrderStatus from './views/OrderStatus';
import Orders from './views/Orders';
import Addresses from './views/Address';
import Restaurants from './views/Restaurants';
import Restaurant from './views/Restaurant';
import CheckOut from './views/CheckOut';

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
      <Order path="/order/:orderId" />
      <OrderStatus path="/order/:orderId/status" />
      <Restaurant path="/restaurant/:restaurantId/*" />
      <CheckOut path="/checkout" />
    </Router>
  );
};

export default Root;
