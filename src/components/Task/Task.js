import React, {Component} from 'react';
import './Task.css';
import { task } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      new_item_name: ''
    };
  }

  handleDelete = () => {
    const { boardId, listId} = this.props;
    task.deleteTask(boardId, listId, this.props.task.id).then(r => this.props.removeTask());
  }

  render() {
    return (
      <div className='taskContainer'>
        { this.props.task.description }
        <IconButton>
          <DeleteIcon onClick={() => this.handleDelete()}/>
        </IconButton>
      </div>
    )
  }
}
