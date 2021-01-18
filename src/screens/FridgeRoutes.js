import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import {Home} from './home';
import {Login} from './login';
import {Fridge} from './fridge';

export const FridgeRoutes = () => {
    return (
        <Router>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/fridge">
              <Fridge />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    )
}