import React, { Component } from 'react';
import './Dashboard.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

import * as routes from '../../constants/routes';

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
  handleLogout() {
    auth.doSignOut()
      .then((authUser) => {
        this.props.history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
      })
  }

  render() {
    return (
      <div className="dashboardContainer">
        
        DASHBOARD TEST
        <Logo/>
        <Link to='#' className="logout" onClick={ () => this.handleLogout() }>
          Logout
        </Link>
      </div>

     )
  }
}
