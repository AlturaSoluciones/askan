import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Logo.css';

export default class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="App-name">
          ASKAN
        </h2>
        <p>
          Alturasoluciones' Kanban
        </p>
      </div>
    );
  }
}
