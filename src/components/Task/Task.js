import React, {Component} from 'react';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      new_item_name: ''
    };
  }

  render() {
    return (
      <div className='taskContainer'>
        { this.props.task.description }
      </div>
    )
  }
}
