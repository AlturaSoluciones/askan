import React, { Component } from 'react';
const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
            isAuth: false,
            uid: null,
            toggleAuth: (isLogged) => {
              this.setState({ isAuth: isLogged })
            },
            setUid: (uid) => {
              this.setState({ uid: uid })
            }
          }
  
  componentDidMount() {
    var uid = localStorage.getItem('uid');
    this.setState({ isAuth: this.getAuthState(uid) });
  }

  getAuthState(uid){
    return uid != null
  }
    
  render() {
    return (
      <AuthContext.Provider
        value={ this.state }
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
