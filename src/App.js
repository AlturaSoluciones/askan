import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './components/general.css';

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Board  from "./components/Board/Board";
import { AuthProvider, withAuthConsumer } from "./components/Contexts/Protect";

const authLogin = withAuthConsumer(Login);
const authDashboard = withAuthConsumer(Dashboard);
const authBoard = withAuthConsumer(Board);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={authLogin} />
            <Route
              path='/login'
              component={ authLogin }
            />
            <Route
              path='/signup'
              component={ Signup }
            />
            <Route
              path='/dashboard'
              component={ authDashboard }
            />
            <Route
              path='/board/:board_id'
              component={ authBoard }
            />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
