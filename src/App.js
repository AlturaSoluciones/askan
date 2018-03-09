import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login/Login";
import config from './config'
import firebase from 'firebase';
import Signup from "./components/Signup/Signup";

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
        <Signup/>
      </div>
    );
  }
}

export default App;
