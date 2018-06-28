import React, {Component} from 'react';
import './Dashboard.css';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthConsumer } from "../../components/Contexts/Protect";
import { board } from '../../firebase';

import * as routes from '../../constants/routes';

// Material-UI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      boards: [
        {
          name: 'Board 1'
        },
        {
          name: 'Board 2'
        }
      ],
      new_board_name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    //Create example
    //board.createBoard("Pruebafinal", "promesa").then(r => console.log(r));
    //List Example
    board.listBoards().then(r => console.log(r));    
  }

  handleLogout(toggleAuth, setUid) {
    auth.doSignOut()
      .then(() => {
        toggleAuth(false);
        setUid(null);
        localStorage.removeItem('uid');
        this.props.history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addBoard = () => {
    this.setState({boards: [...this.state.boards, {name: this.state.new_board_name}], new_board_name: ''})
  };

  handleEdit = (key) => {
    console.log("edited: ", key);
  };

  handleDelete = (key) => {
    this.setState({boards: this.state.boards.filter(board => board.name !== key)});
  };

  renderRedirect() {
    this.props.history.push(routes.LANDING);
  }

  render() {
    return (
      <AuthConsumer>
        {({isAuth, toggleAuth, setUid}) => (
          <div className="root">
            {isAuth ? (
              <div>
                <AppBar position="static">
                  <Toolbar>
                    <Logo/>
                    <Button color="inherit" onClick={() => this.handleLogout(toggleAuth, setUid)}>Logout</Button>
                  </Toolbar>
                </AppBar>
                <div className="add-board">
                  < TextField
                    id="add-board-text"
                    label="Board Name"
                    className="textField"
                    value={this.state.new_board_name}
                    onChange={this.handleChange('new_board_name')}
                    margin="normal"
                  />
                  <Button variant="fab" color="primary" aria-label="add" className="add-board-button"
                          onClick={this.addBoard}>
                    <AddIcon/>
                  </Button>
                </div>

                <div className="boards-list">
                  <List component="nav">
                    {this.state.boards.map(board => {
                      return (
                        <ListItem key={board.name}>
                          <ListItemText primary={board.name}/>
                          <IconButton aria-label="Edit" onClick={() => this.handleEdit(board.name)}>
                            <EditIcon/>
                          </IconButton>
                          <IconButton>
                            <DeleteIcon onClick={() => this.handleDelete(board.name)}/>
                          </IconButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
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
