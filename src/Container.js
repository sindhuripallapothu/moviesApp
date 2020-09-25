import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Admin from './Admin'
import Login from './Login';

const Container = () => (
  <div className="app-routes">
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/moviesAdmin" component={Admin} />
      <Route path="/movies" component={App} />
    </Switch>
  </div>
);

export default Container;