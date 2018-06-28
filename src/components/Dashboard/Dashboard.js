import React, { Component } from 'react';
import './Dashboard.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthConsumer } from "../../components/Contexts/Protect";
import { board } from '../../firebase';

import * as routes from '../../constants/routes';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('uid'));
    //Create example
    //board.createBoard("Pruebafinal", "promesa").then(r => console.log(r));
    //List Example
    board.listBoards().then(r => console.log(r));    
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
