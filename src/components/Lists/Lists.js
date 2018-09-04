import React, {Component} from 'react';
import { default as ListComp } from './List';
import './List.css';

import { heap } from '../../firebase';

// Material-UI imports
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

export default class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      arrayLists: [],
      new_item_name: ''
    };
  }

  componentDidMount() {
    let arrayLists = this.buildBoardList();
    this.setState({ arrayLists });
  }

  buildBoardList = () => {
    let lists = [];
    if (this.props.board) {
      let heaps = this.props.board.heaps;
      if (heaps) {
        lists = Object.keys(heaps).map(i => {
          return {
            id: i,
            name: heaps[i].name,
            tasks: heaps[i].tasks
          };
        });
      }
    }
    return lists;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addList = async () => {
    let newKey = await heap.createHeap(this.props.board.id, this.state.new_item_name);
    let newList = { id: newKey, name: this.state.new_item_name }
    let arrayLists = this.state.arrayLists;
    arrayLists.push(newList);
    this.setState({ arrayLists });
  };

  handleDeleteLists = (listId) => {
    let arrayLists = this.state.arrayLists.filter(function( obj ) {
      return obj.id !== listId;
    });
    this.setState({ arrayLists });
  }

  renderLists = () => {
    if (this.state.arrayLists) {
      return (
        <div>
          { this.renderActionForm() }
          <List component="nav" className="list-nav">
            { this.state.arrayLists &&
              this.state.arrayLists.map((list, idx) => <ListComp key={idx}
                                                        list={list}
                                                        boardId={this.props.board.id}
                                                        handleDeleteLists={this.handleDeleteLists}/>)
            }
          </List>
      </div>
      )
    } else {
      return this.renderActionForm() 
    }
  }

  renderActionForm() {
    return (
      <div className="add-board">
        <TextField id="add-board-text" label="List Name" className="textField" value={this.state.new_item_name} onChange={this.handleChange} name='new_item_name' margin="normal" />
        <Button variant="fab" color="primary" aria-label="add" className="add-board-button" onClick={() => this.addList()}>
          <AddIcon />
        </Button>
      </div>
    );
  }

  render() {
    return(
      <div>
        { this.renderLists() }
      </div>
    );
  }
}
