/* eslint-disable import/no-named-as-default */
import { Route, Switch } from 'react-router-dom';

// import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import AboutPage from './AboutPage';
import FuelSavingsPage from './containers/FuelSavingsPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

/* 
  <div>
    <NavLink exact to="/" activeStyle={activeStyle}>
      Home
    </NavLink>
    {' | '}
    <NavLink to="/fuel-savings" activeStyle={activeStyle}>
      Demo App
    </NavLink>
    {' | '}
    <NavLink to="/about" activeStyle={activeStyle}>
      About
    </NavLink>
  </div>
*/
class App extends React.Component {
  render() {
    // const activeStyle = { color: 'blue' };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {};

export default hot(module)(App);
