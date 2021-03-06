import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import {Home} from './home';
import {Login} from './login';
import {Fridge} from './fridge';
import {Recipe} from './recipe';

export const FridgeRoutes = (data) => {    

    return (
        <Router>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/fridge">
              <Fridge data={data}/>
            </Route>
            <Route path="/recipe">
              <Recipe data={data}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    )
}