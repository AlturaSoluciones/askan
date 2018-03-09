import React, {Component} from 'react';
import './Signup.css';
import Logo from '../Logo/Logo'
import Button from 'material-ui/Button';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default class Signup extends Component {
   constructor(props) {
      super(props);
      this.state = {email: '', password: '', passwordConfirmation: ''};

   }

   render() {
      return (
         <div>
            <Logo/>
            <form className="signupForm">
               <TextField className="signupInput" required label="Email" value={this.state.email}/>
               <TextField className="signupInput" required label="Password" value={this.state.password}/>
               <TextField className="signupInput" required label="Password Confirmation"
                          value={this.state.passwordConfirmation}/>
               <Button variant="raised">
                  Signup
               </Button>
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
