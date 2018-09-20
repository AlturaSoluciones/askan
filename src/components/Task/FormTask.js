import React, {Component} from 'react';
import './Task.css';
import { task as fbTask } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
// Card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class FormTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
              id: '',
              description: '',
              dueDate: ''
            },
      isNew: false
    }
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({ task: this.props.task });
      
    }
  }

  handleChange = event => {
    let task = this.state.task;
    task[event.target.name] = event.target.value;
    this.setState({ task });
  }

  handleSave = (isNew) => {
    let task = this.state.task;
    if (isNew) {
      fbTask.createTask(this.props.boardId, this.props.list.id, task)
            .then(r => {
              task.id = r;
              this.props.saveTask(task);
            });
    } else {
      task.id = this.props.task.id;
      fbTask.updateTask(this.props.boardId, this.props.listId, task.id, task)
          .then(r => this.props.saveTask(task));
    }
  };

  handleCancel = () => {
    this.props.saveTask(false);
  };

  buildFormatDate = (isNew) => {
    if (!isNew) {
      return this.props.task.dueDate;
    }
  }

  render() {
    const { isNew } = this.props;
    return (
        <Card className='card'>
          <CardContent>
            <Typography variant="headline">
              Description:
              </Typography>
            <textarea value={this.state.task.description}
                      onChange={this.handleChange}
                      name="description"
                      rows='8'
                      columns='10'
            />
            <Typography variant="subheading">
              Due date:
            </Typography>
            <TextField
              id="dueDate"
              name="dueDate"
              type="date"
              onChange={this.handleChange}
              defaultValue={this.buildFormatDate(isNew)}
              InputLabelProps={{
                shrink: true,
              }}
            />

          </CardContent>
          <IconButton>
            <CancelIcon onClick={() => this.handleCancel()} />
            <SaveIcon onClick={() => this.handleSave(isNew)} />
          </IconButton>
        </Card>
    )  
  }
}
