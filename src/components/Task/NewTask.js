import React, {Component} from 'react';
import './Task.css';
import { task as fbTask } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
  }

  handleChange = event => {
    let description = event.target.value;
    this.setState({ description });
  }

  handleSave = () => {
    fbTask.createTask(this.props.boardId, this.props.list.id, this.state.description)
          .then(r => this.props.addTask({ id: r, description: this.state.description }));
  };

  handleCancel = () => {
    this.props.addTask(false);
  };

  render() {
    let list = this.props.list;
    return (
      <div key={'nt-' + list.id} className="taskContainer">
        <TextField key={'tfnt-' + list.id}
          id={'list-id-' + list.id}
          className='taslTextField'
          value={this.state.description}
          onChange={this.handleChange}
          margin = 'normal'
        />
        <IconButton>
          <CancelIcon onClick={() => this.handleCancel()}/>
          <SaveIcon onClick={() => this.handleSave(list.id, list.name)}/>
        </IconButton>
      </div>
    )  
  }
}
