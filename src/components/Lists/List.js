import React, {Component} from 'react';
import './List.css';
import Task from '../Task/Task';
import NewTask from '../Task/FormTask';

import { heap } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      name: '',
      list: this.props.list,
      tasks: this.buildTasks(this.props.list.tasks),
      showEdit: false,
      showNewTask: false
    };
  }

  buildTasks = (taskLists) => {
    let _tasks = [];
    if (taskLists) {
      _tasks = Object.keys(taskLists).map(i => {
        return {
          id: i,
          description: taskLists[i].description,
        };
      });
    }
    return _tasks;
  }

  toggleNewTask = (show) => {
    this.setState({ showNewTask: show })
  }

  handleDelete = () => {
    const {boardId, list} = this.props;
    heap.deleteHeap(boardId, list.id);
    this.props.handleDeleteLists(list.id);
  };

  showEdit = (name) => {
    this.setState({ showEdit: true, name: name});
  };

  editListName  = event => {
    this.setState({ name: event.target.value })
  };

  handleSave = (list) => {
    list.name = this.state.name;
    heap.updateHeap(this.props.boardId, list.id, {name: list.name}).then(r => {
      this.setState({ showEdit: false, list });
    });
  }

  handleCancel = () => {
    this.setState({ showEdit: false});
  };

  renderTask = (boardId, listId, task) => {
    return (
      <Task key={ task.id }
            boardId={boardId}
            listId={listId}
            task={task}
            removeTask={this.removeTask}
            isNew={false}
      />
    )
  };

  saveTask = (task) => {
    let tasks = this.state.tasks;
    if (task) {
      tasks.push(task);
    }
    this.setState({ tasks, showNewTask: false });  
  }

  removeTask = (taskId) => {
    let tasks = this.state.tasks.filter(function( obj ) {
      return obj.id !== taskId;
    });
    this.setState({ tasks });
  }

  renderNewTask = () => {
    let list = this.state.list;
    if (this.state.showNewTask) {
      return (
        <NewTask list={list} boardId={this.props.boardId} saveTask={this.saveTask} isNew={true}/>
      )
    } else {
      return (
        <IconButton aria-label="Add task" onClick={ () => this.toggleNewTask(true) }>
          <div className='right'> <AddIcon/> </div>
        </IconButton>
      )
    }
  };

  render() {
    let _list = this.state.list;
    if (this.state.showEdit) {
      return(
        <div key={'l-' + _list.id} className="listContainer">
          <ListItem>
            <TextField key={'tf-' + _list.id}
              id={'list-id-' + _list.id}
              className="listTextField"
              value={this.state.name}
              onChange={this.editListName}
              margin="normal"
            />
            <IconButton>
                <CancelIcon onClick={ () => this.handleCancel() }/>
                <SaveIcon onClick={ () => this.handleSave(_list) }/>
            </IconButton>
          </ListItem>
        </div>
      );
    } else {
      return(
        <div className="listContainer">
          <ListItem>
              <div>
                <IconButton aria-label="Edit" onClick={() => this.showEdit(_list.name)}>
                  <EditIcon/>
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => this.handleDelete()}/>
                </IconButton>
                <ListItemText primary={_list.name} className='titleList' />
              </div>
            </ListItem>
            <div className='center'> TAREAS </div>
            <div className='right'>
              { this.state.tasks.map(task => this.renderTask(this.props.boardId, _list.id, task)) }
              { this.renderNewTask() }
            </div>
        </div>
      );
    }
  }
}
