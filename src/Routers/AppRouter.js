import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../Components/Header'
import PositionsPage from '../Components/PositionsPage';
import Settings from '../Components/Settings';
import NotFoundPage from '../Components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div className="app">
    <Header />
      <Switch>
        <Route path="/trading-app" component={PositionsPage} exact={true} />
        <Route path="/trading-app/settings" component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
