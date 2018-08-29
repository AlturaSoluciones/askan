import React, {Component} from 'react';
import './Task.css';
import { task } from '../../firebase';

// Material-UI imports
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

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
    task.createTask(this.props.boardId, this.props.list.id, this.state.description);
    this.props.addNewTask();
  };

  render() {
    let list = this.props.list;
    if (this.props.list.showNewTask) {
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
              <SaveIcon onClick={() => this.handleSave(list.id, list.name)}/>
          </IconButton>
        </div>
      )  
    } else {
      return null;
    }
  }
}
