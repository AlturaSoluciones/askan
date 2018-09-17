import React, {Component} from 'react';
import './Signup.css';
import Logo from '../Logo/Logo'
import { Button, TextField } from 'material-ui';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth } from "../../firebase";
import * as firebase from "firebase";
import * as routes from "../../constants/routes";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      passwordConfirmation: '',
      errorMessage: ''
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.validatePasswords = this.validatePasswords.bind(this);
  }

  handleTextFieldChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSignup() {
    if (this.validatePasswords()) {
      auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then ( ()=> {
        this.setState({errorMessage: "Signup successfull"});
        this.props.history.push(routes.SIGN_IN);
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
      });
    }
  }

  validatePasswords() {
    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ errorMessage: "Passwords don't match" });
      return false;
    }
    return true;
    
  }

   render() {
      return (
         <div>
            <Logo/>
            <form className="signupForm">
            {this.state.errorMessage}
               <TextField
                name="email"
                className="signupInput"
                required label="Email"
                value={this.state.email}
                onChange={this.handleTextFieldChange}
              />
               <TextField
                name="password"
                className="signupInput"
                required label="Password"
                value={this.state.password}
                onChange={this.handleTextFieldChange}
                type="password"
              />
               <TextField
                name="passwordConfirmation"
                className="signupInput" 
                required 
                label="Password Confirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleTextFieldChange}
                type="password"
              />
               <Button 
                variant="raised" 
                className="signupButton"
                onClick={this.handleSignup}
              >
                  Signup
               </Button>
               <Link to="/login" className="loginLink">Login</Link>
            </form>
         </div>
      )
   }
}

Signup.propTypes = {
   username: propTypes.string,
   password: propTypes.string,
   passwordConfirmation: propTypes.string
};
