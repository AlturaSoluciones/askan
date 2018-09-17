import React, {Component} from 'react';
import './Task.css';
import { task as fbTask } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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
              description: ''
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
    let task = {}
    task.description = event.target.value;
    this.setState({ task });
  }

  handleSave = (isNew) => {
    if (isNew) {
      fbTask.createTask(this.props.boardId, this.props.list.id, this.state.task.description)
            .then(r => this.props.saveTask({ id: r, description: this.state.task.description }));
    } else {
      let task = this.state.task;
      task.id = this.props.task.id;
      fbTask.updateTask(this.props.boardId, this.props.listId, task.id, task)
          .then(r => this.props.saveTask(task));
    }
    
  };

  handleCancel = () => {
    this.props.saveTask(false);
  };

  render() {
    const { listId, isNew } = this.props;
    return (
      <div key={'nt-' + listId} className="taskContainer">
        <Card className='card'>
          <CardContent>
            <Typography variant="headline">
              Descripción:
              </Typography>
            <textarea value={this.state.task.description}
                      onChange={this.handleChange}
                      rows='8'
            />
          </CardContent>
          <IconButton>
            <CancelIcon onClick={() => this.handleCancel()} />
            <SaveIcon onClick={() => this.handleSave(isNew)} />
          </IconButton>
        </Card>
      </div>
    )  
  }
}
