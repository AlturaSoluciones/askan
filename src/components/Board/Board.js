import React, {Component} from 'react';
import './Board.css';
import Header from '../Header/Header';
import ListsComp from '../Lists/Lists';
import { board } from '../../firebase';

import * as routes from '../../constants/routes';

// Material-UI imports
import AppBar from '@material-ui/core/AppBar';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      new_item_name: ''
    };
  }

  async componentDidMount() {
    this.buildElements();
  }

  buildElements = async () => {
    let boardId = this.props.match.params.board_id;
    localStorage.setItem('currentPath', this.props.match.url);
    let localBoard = await board.getById(boardId);
    this.setState({ board: localBoard });
    if (!this.props.auth.isAuth){
      localStorage.removeItem('currentPath');
      this.props.history.push(routes.LANDING);
    }
  }

  renderBoardHeaders = () =>{
    return this.state.board && this.state.board.name;
  };

  render() {
    if ( this.state.board && this.props.auth.isAuth) {
      return (
        <div className="root">
            <div>
              <AppBar position="static">
                <Header auth={ this.props.auth } history={ this.props.history }/>
              </AppBar>
              <div className="boardHeader">
                { this.renderBoardHeaders() }
              </div>
              <div className="boards-list">
                <ListsComp board={this.state.board}/>
              </div>
            </div>
        </div>
      )
    } else {
      return null
    }
  }
}
