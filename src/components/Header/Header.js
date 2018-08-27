import React, {Component} from 'react';
import Logo from '../Logo/Logo'
import { auth } from '../../firebase';

import * as routes from '../../constants/routes';

// Material-UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default class Header extends Component {
  
 
  handleLogout = () => {
    auth.doSignOut()
      .then(() => {
        this.props.toggleAuth(false);
        this.props.setUid(null);
        localStorage.removeItem('uid');
        this.props.history.push(routes.LANDING);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    
    return (
      <AppBar position="static">
          <Toolbar>
            <Logo/>
            <Button color="inherit" onClick={ this.handleLogout }>Logout</Button>
          </Toolbar>
      </AppBar>
    )
  }
}
