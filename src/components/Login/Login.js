import React, { Component } from 'react';
import './Login.css';
import Logo from '../Logo/Logo'
import { Button, TextField } from 'material-ui';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }
  handleTextFieldChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  render() {
    return (
      <div className="loginContainer">
        <Logo/>
        <form className="loginForm">
          <TextField
            name="email"
            className="loginInput"
            required label="Email"
            value={this.state.email}
            onChange={this.handleTextFieldChange}
          />
          <TextField
            name="password"
            className="loginInput"
            required label="Password"
            value={this.state.password}
            onChange={this.handleTextFieldChange}
            type="password"
          />
          <Button variant="raised" className="loginButton">
            Login
          </Button>
        </form>
        <Link to="/signup" className="signupLink">Signup</Link>
      </div>

     )
  }
}
