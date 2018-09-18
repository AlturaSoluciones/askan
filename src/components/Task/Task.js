import React, {Component} from 'react';
import './Task.css';
import { task as fbTask } from '../../firebase';

import FormTask from './FormTask';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// Card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      task: {}
    };
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({ task: this.props.task });
    }
  }
  
  handleDelete = () => {
    const { boardId, listId, task} = this.props;
    fbTask.deleteTask(boardId, listId, task.id).then(r => this.props.removeTask(task.id));
  }

  toggleShowEdit = (showEdit) => {
    this.setState({ showEdit });
  }

  saveTask = (task) => {
    if (task) {
      this.setState({ showEdit: false, task });
    } else {
      this.setState({ showEdit: false});
    }
  }

  render() {
    let { task, boardId, listId, isNew } = this.props;
    if (this.state.showEdit) {
      return (
        <div>
          <FormTask boardId={boardId}
                    listId={listId}
                    task={task}
                    saveTask={this.saveTask}
                    isNew={isNew}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Card className='card'>
            <CardContent>
              <Typography variant="headline">
                Description:
              </Typography>
              <Typography>
                {this.state.task.description}
              </Typography>
              <br/>
              <Typography variant="subheading">
                Due date:
              </Typography>
              <Typography>
                {this.state.task.dueDate}
              </Typography>
              <IconButton>
                <EditIcon onClick={() => this.toggleShowEdit(true)} />
                <DeleteIcon onClick={() => this.handleDelete()} />
              </IconButton>
            </CardContent>
          </Card>
        </div>
      )
    }
    
  }
}
