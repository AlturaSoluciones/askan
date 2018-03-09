import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login/Login";
import config from './config'
import firebase from 'firebase';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
