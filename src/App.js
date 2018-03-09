import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import './components/general.css';

import config from './config'
import firebase from 'firebase';

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import Button from 'material-ui/Button';

firebase.initializeApp(config);

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
        </Switch>
      </Router>
    );
  }
}

export default App;
