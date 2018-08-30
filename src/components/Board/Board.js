import React, {Component} from 'react';
import './Board.css';
import Header from '../Header/Header';
import Task from '../Task/Task';
import NewTask from '../Task/NewTask';
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
    this.buildElements();
  }

  buildElements = async () => {
    let boardId = this.props.match.params.board_id;
    localStorage.setItem('currentPath', this.props.match.url);
    let localBoard = await board.getById(boardId);
    let boardLists = this.buildBoardList(localBoard.heaps);
    boardLists.map(list => list['isVisible'] = true);
    boardLists.map(list => list['showNewTask'] = false);
    this.setState({ boardLists, board: localBoard });
    if (!this.props.auth.isAuth){
      localStorage.removeItem('currentPath');
      this.props.history.push(routes.LANDING);
    }
  }

  buildBoardList = (heaps) => {
    let _heaps = [];
    if (heaps) {
      _heaps = Object.keys(heaps).map(i => {
        return {
          id: i,
          name: heaps[i].name,
          tasks: this.buildTasks(heaps[i].tasks)
        };
      });
    }
    return _heaps;
  }

  buildTasks = (tasks) => {
    let _tasks = [];
    if (tasks) {
      _tasks = Object.keys(tasks).map(i => {
        return {
          id: i,
          description: tasks[i].description,
        };
      });
    }
    return _tasks;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addList = async () => {
    let board = this.state.board;
    await heap.createHeap(board.id, this.state.new_item_name);
    this.buildElements();
  };

  handleEdit = (id) => {
    let boardLists = this.state.boardLists;
    let list = boardLists.find(function (obj) { return obj.id === id; });
    let listIndex = boardLists.indexOf(list);
    list['isVisible'] = false;
    boardLists[listIndex] = list;
    this.setState({ boardLists });
  };

  handleDelete = async (id) => {
    let board = this.state.board;
    await heap.deleteHeap(board.id, id);
    this.buildElements();
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

  addNewTask = () => {
    this.buildElements();
  }

  removeTask = () => {
    this.buildElements();
  }

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
          <div className='center'> TAREAS </div>
          <div className='right'>
            { list.tasks.map(task => this.renderTask(this.state.board.id, list.id, task)) }
            <IconButton aria-label="Add task" onClick={ () => this.showNewTask(list) }>
              <div className='right'> <AddIcon/> </div>
            </IconButton>
          </div>
          <NewTask list={list} boardId={this.state.board.id} addNewTask={this.addNewTask}/>
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

  renderTask = (boardId, listId, task) => {
    return (
      <Task key={ task.id } boardId={boardId} listId={listId} task={task} removeTask={this.removeTask} />
    )
  };

  showNewTask = (list) => {
    let boardLists = this.state.boardLists;
    let editList = boardLists.find(function (obj) { return obj.id === list.id; });
    let listIndex = boardLists.indexOf(editList);
    editList['showNewTask'] = true;
    boardLists[listIndex] = editList;
    this.setState({ boardLists });
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
  };

  render() {
    if (this.props.auth.isAuth) {
      return (
        <div className="root">
            <div>
              <AppBar position="static">
                <Header auth={ this.props.auth } history={ this.props.history }/>
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
