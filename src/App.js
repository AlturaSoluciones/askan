import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './components/general.css';

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route
            path='/login'
            component={ Login }
          />
          <Route
            path='/signup'
            component={ Signup }
          />
          <Route
            path='/dashboard'
            component={ Dashboard }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
