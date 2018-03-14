import React, { Component } from 'react';
import './Dashboard.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }
  handleTextFieldChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  render() {
    return (
      <div className="dashboardContainer">
        
        DASHBOARD TEST
      </div>

     )
  }
}
