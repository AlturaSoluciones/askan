import React, {Component} from 'react';
import Logo from '../Logo/Logo'

import * as routes from '../../constants/routes';

// Material-UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default class Header extends Component {
 
  handleLogout = () => {
    this.props.auth.logout();
    this.props.history.push(routes.LANDING);
  }

  gotoDashboard = () => {
    this.props.history.push(routes.DASHBOARD);
  }

  render() {
    
    return (
      <AppBar position="static">
        <Toolbar>
          <Logo/>
          <Button color="inherit" onClick={ this.gotoDashboard } className={ this.props.hideDashboardButton ? 'hidden' : '' }>Dashboard</Button>
          <Button color="inherit" onClick={ this.handleLogout }>Logout</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
