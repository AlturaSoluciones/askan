import React, { Component } from 'react';
import './Login.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    return (
      <div className="loginContainer">
        <Logo/>
        <Link to="/signup" className="signupLink">Signup</Link>
      </div>

     )
  }
}
