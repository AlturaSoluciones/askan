import React, {Component} from 'react';
import './Board.css';
import Logo from '../Logo/Logo'
import { auth } from '../../firebase';
import { AuthConsumer } from "../../components/Contexts/Protect";
import { board } from '../../firebase';
import { heap } from '../../firebase';

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
import SaveIcon from '@material-ui/icons/Save';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      board: null,
      boardLists: [],
      new_item_name: ''
    };
  }

  componentDidMount() {
    let board = this.props.location.state.board;
    this.setState({ board });
    let boardLists = null;
    boardLists = heap.listHeaps(board.id).then(r => {
      boardLists = r;
      boardLists.map(list => list['isVisible'] = true);
      this.setState({ boardLists })
    })
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addList = () => {
    let board = this.state.board;
    heap.createHeap(board.id, this.state.new_item_name).then(r => console.log(r));
    let boardLists = [];
    boardLists = heap.listHeaps(board.id).then(r => {
      boardLists = r;
      boardLists.map(list => list['isVisible'] = true);
      this.setState({ boardLists })
    });

  };

  handleEdit = (id) => {
    let boards = this.state.boards;
    let editedBoard = boards.find(function (obj) { return obj.id === id; });
    let indexBoard = boards.indexOf(editedBoard);
    editedBoard.isVisible = false;
    boards[indexBoard] = editedBoard; 
    this.setState({ boards })
  };

  handleDelete = (id) => {
    let board = this.state.board;
    heap.deleteHeap(board.id, id).then(r => {
      let boardLists = [];
      boardLists = heap.listHeaps(board.id).then(r => {
        boardLists = r;
        boardLists.map(list => list['isVisible'] = true);
        this.setState({ boardLists })
      });
    });
  };

  handleSave = (id, newName) => {
    let boards = this.state.boards;
    let editedBoard = boards.find(function (obj) { return obj.id === id; });
    let indexBoard = boards.indexOf(editedBoard);
    editedBoard.isVisible = true;
    boards[indexBoard] = editedBoard;
    board.updateBoard(id, {name: newName}).then(r => this.setState({ boards }));
  };

  renderRedirect() {
    this.props.history.push(routes.LANDING);
  }

  editBoardName = id => event => {
    let boards = this.state.boards;
    let editedBoard = boards.find(function (obj) { return obj.id === id; });
    let indexBoard = boards.indexOf(editedBoard);
    editedBoard.name = event.target.value;
    boards[indexBoard] = editedBoard; 
    this.setState({ boards })
  };

  renderListItems = (list) => {
    return(
      <div key={list.id}>
        <ListItem>
          <ListItemText primary={list.name} />
          <IconButton>
            <DeleteIcon onClick={() => this.handleDelete(list.id)}/>
          </IconButton>
        </ListItem>
      </div>
    );
  }

  renderHeaps = (board) => {
    let boardLists = [];
    boardLists = this.state.boardLists;
    boardLists.map(list => list['isVisible'] = true);
    return (
      <List component="nav">
        {
          boardLists.map(list =>
            this.renderListItems(list)
        )}
      </List>
    )
  };
  
  renderBoardHeaders = () =>{
    return this.props.location.state.board.name
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
                <div className="boardHeader">
                  { this.renderBoardHeaders() }
                </div>
                <div className="add-board">
                  <TextField
                    id="add-board-text"
                    label="List Name"
                    className="textField"
                    value={this.state.new_item_name}
                    onChange={this.handleChange}
                    name='new_item_name'
                    margin="normal"
                  />
                  <Button variant="fab" color="primary" aria-label="add" className="add-board-button"
                          onClick={() => this.addList()}>
                    <AddIcon/>
                  </Button>
                </div>

                <div className="boards-list">
                  { this.renderHeaps(board) }
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
