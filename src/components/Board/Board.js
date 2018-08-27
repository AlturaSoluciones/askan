import React, {Component} from 'react';
import './Board.css';
import Header from '../Header/Header'
import { board } from '../../firebase';
import { heap } from '../../firebase';

import * as routes from '../../constants/routes';

// Material-UI imports
import AppBar from '@material-ui/core/AppBar';
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
    let boardId = this.props.match.params.board_id;
    board.getById(boardId).then(r => {
      let board = r;
      this.setState({ board });
      let boardLists = null;
      if(board.id){
        boardLists = heap.listHeaps(board.id).then(r => {
          boardLists = r;
          boardLists.map(list => list['isVisible'] = true);
          this.setState({ boardLists });
            if (!this.props.auth.isAuth){
              localStorage.removeItem('currentPath');
              this.props.history.push(routes.LANDING);
            }
        })
      }
    });
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
    let boardLists = this.state.boardLists;
    let list = boardLists.find(function (obj) { return obj.id === id; });
    let listIndex = boardLists.indexOf(list);
    list['isVisible'] = false;
    boardLists[listIndex] = list;
    this.setState({ boardLists });
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
    let board = this.state.board;
    let boardLists = this.state.boardLists;
    let edited = boardLists.find(function (obj) { return obj.id === id; });
    let index = boardLists.indexOf(edited);
    edited.isVisible = true;
    boardLists[index] = edited;
    heap.updateHeap(board.id, edited.id, {name: newName}).then(r => this.setState({ boardLists }));
  };

  editListName = id => event => {
    let boardLists = this.state.boardLists;
    let edited = boardLists.find(function (obj) { return obj.id === id; });
    let index = boardLists.indexOf(edited);
    edited.name = event.target.value;
    boardLists[index] = edited;
    this.setState({ boardLists })
  };

  renderListItems = (list) => {
    if (list.isVisible) {
      return(
        <div key={list.id} className="listContainer">
          <ListItem>
            <div>
              <IconButton aria-label="Edit" onClick={() => this.handleEdit(list.id)}>
                <EditIcon/>
              </IconButton>
              <IconButton>
                <DeleteIcon onClick={() => this.handleDelete(list.id)}/>
              </IconButton>
              <ListItemText primary={list.name} className='titleList' />
            </div>
          </ListItem>
        </div>
      );
    } else {
      return(
        <div key={'l-' + list.id} className="listContainer">
          <TextField key={'tf-' + list.id}
            id={'list-id-' + list.id}
            className="listTextField"
            value={list.name}
            onChange={this.editListName(list.id)}
            margin="normal"
          />
          <IconButton>
              <SaveIcon onClick={() => this.handleSave(list.id, list.name)}/>
          </IconButton>
        </div>
      );
    } 
  }

  renderHeaps = (board) => {
    let boardLists = [];
    boardLists = this.state.boardLists;
    return (
      <List component="nav" className="list-nav">
        {
          boardLists.map(list =>
            this.renderListItems(list)
        )}
      </List>
    )
  };
  
  renderBoardHeaders = () =>{
    return this.state.board && this.state.board.name;
  }

  render() {
    if (this.props.auth.isAuth) {
      return (
        <div className="root">
            <div>
              <AppBar position="static">
                <Header toggleAuth={ this.props.auth.toggleAuth } setUid= { this.props.auth.setUid } history={ this.props.history }/>
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
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
