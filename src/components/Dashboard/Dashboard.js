import React, { Component } from 'react';
import './Dashboard.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthConsumer } from "../../components/Contexts/Protect";

import * as routes from '../../constants/routes';

// Material-UI imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  handleTextFieldChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleLogout(toggleAuth, setUid) {
    auth.doSignOut()
      .then((authUser) => {
        toggleAuth(false);
        setUid(null);
        localStorage.removeItem('uid');
        this.props.history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
      })
  }

  renderRedirect(){
    this.props.history.push(routes.LANDING);
  }

  render() {
    return (
        <AuthConsumer>
          {({ isAuth, toggleAuth, setUid }) => (

            <div className="dashboardContainer">
              DASHBOARD TEST

              {isAuth ? (
                <div>
                 <Logo/>
                  <Link to='#' className="logout" onClick={ () => this.handleLogout(toggleAuth, setUid) }>
                    Logout
                  </Link>
                </div>
              ) : (
                <div>{this.renderRedirect()}</div>
              )}

            </div>

            )}
        </AuthConsumer>
     )
  }
}
