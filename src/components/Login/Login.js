import React, { Component } from 'react';
import './Login.css';
import Logo from '../Logo/Logo'
import { Button, TextField } from 'material-ui';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

import * as firebase from 'firebase';
import { AuthConsumer } from "../../components/Contexts/Protect";
import * as routes from '../../constants/routes';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  handleTextFieldChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleLogin(toggleAuth, setUid) {
    auth.doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then((authUser) => {
        toggleAuth(true);
        var uid = firebase.auth().currentUser.uid;
        localStorage.setItem('uid', uid);
        setUid(uid);
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(error => {
        console.log('Error: ');
        console.log(error.message);
        this.setState({errorMessage: error.message});
      });
  }

  redirectToDashboard(isAuth){
     this.props.history.push(routes.DASHBOARD);
  }

  renderRedirect(){
    this.props.history.push(routes.DASHBOARD);
  }

  render() {
    return (
       <AuthConsumer>
        { ({ isAuth, toggleAuth, setUid } ) => (
          <div className="loginContainer">
          {!isAuth ? (
            <div>
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
              <Button variant="raised" className="loginButton" onClick={ () => this.handleLogin(toggleAuth, setUid) }>
                Login
              </Button>
            </form>
            <Link to="/signup" className="signupLink">Signup</Link>
              <p>
                {this.state.errorMessage}
              </p>

            </div>

            ) : (
                <div>
                  {this.renderRedirect()}
                </div>
              )}
          </div>
        )}
        </AuthConsumer>
     )
  }
}
