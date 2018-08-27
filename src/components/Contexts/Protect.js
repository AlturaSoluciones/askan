import React, {Component} from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isAuth: false,
    uid: null,
    toggleAuth: (isLogged) => {
      this.setState({isAuth: isLogged})
    },
    setUid: (uid) => {
      this.setState({uid: uid})
    },
    logout: () => {
      this.logout();
    }
  }

  componentDidMount() {
    var uid = localStorage.getItem('uid');
    this.setState({isAuth: this.getAuthState(uid)});
  }

  getAuthState(uid) {
    return uid != null
  }

  logout = () => {
   auth.doSignOut()
    .then(() => {
      this.state.toggleAuth(false);
      this.state.setUid(null);
      localStorage.removeItem('uid');
      localStorage.removeItem('currentPath');
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  render() {
    return (
      <AuthContext.Provider
        value={this.state}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;
export {AuthProvider, AuthConsumer};

export function withAuthConsumer(Component) {
  return  function AuthComponent(props){
    return (
      <AuthContext.Consumer>
        {auth => <Component {...props} auth={auth} />}
      </AuthContext.Consumer>
    )
  }
}
