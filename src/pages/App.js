import { Route, Switch } from 'react-router-dom';

import React from 'react';
import { hot } from 'react-hot-loader';
import AboutPage from './AboutPage';
import FuelSavingsPage from './containers/FuelSavingsPage';
import HomePage from './HomePage';
import TonightGamePage from './TonightGamePage';
import UpdateAlerts from './UpdateAlerts';
import RunSimulation from './RunSimulation';
import Portfolio from './Portfolio';
import NotFoundPage from './NotFoundPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/run-simulation" component={RunSimulation} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/update-alerts" component={UpdateAlerts} />
          <Route exact path="/tonight" component={TonightGamePage} />
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
