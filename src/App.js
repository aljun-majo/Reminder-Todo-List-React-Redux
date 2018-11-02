import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Form, FormGroup, Label, Input, FormText,
  ListGroup, ListGroupItem, Badge 
} from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';

import { connect } from 'react-redux';
//no need 
//import { bindActionCreators } from 'redux';
import { addList, deleteList, clearList } from './actions/';

class App extends Component {

constructor() {
  super();
  this.state = {
    text: '',
    dueDate: ''
  }
}

addList() {
  console.log('this.state addReminder() ', this.state);
  console.log('this', this);
  console.log('this.state.dueDate: ', this.state.dueDate)
  this.props.addList(this.state.text, this.state.dueDate);
}

deleteList(id) {
  console.log('App.js - id deleteList()', id);
  console.log('App.js - this.state deleteList()', this.state);
  this.props.deleteList(id);
}

renderReminders = () => {
  const { reminders } = this.props;
  console.log('App.js - renderReminders(): ', reminders);
  return (
   <ListGroup>
      {
        reminders.map(reminder => {
          const toUpperCaseFilter = (d) => {
            return d.toUpperCase();
          };
          return (
            <ListGroupItem 
              className="justify-content-between"
              key={reminder.id}
            >
              
              <span className="mr-3">
                {reminder.text}  
              </span>
              <span className="mr-3 font-italic">
                <Moment filter={toUpperCaseFilter}>{reminder.dueDate}</Moment>
              </span>
              <Moment fromNow className="mr-3">{reminder.dueDate}</Moment>
              <Moment format="D MMM YYYY" withTitle className="mr-3">
                {reminder.dueDate}
              </Moment>
              <button 
                className="badge badge-warning btn-delete"
                onClick={() => this.deleteList(reminder.id)}
              >
                <span> &#x2715; </span>
              </button>
              
            </ListGroupItem>
          )
        })
      }
   </ListGroup>
  )
}

  render() {
    console.log('App.js - render() this.props', this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="mb-5 container"> 
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Enter</Label>
              <Input 
                type="text" 
                placeholder="Enter here..." 
                onChange={
                  event => this.setState({text: event.target.value})
                }
                />
                <Input 
                  type="datetime-local"
                  onChange={event => this.setState({
                    dueDate: event.target.value
                  })}
                />
            </FormGroup>
            <div className="mb-3">
              <Button 
                className="btn btn-success"
                onClick={
                  () => this.addList()
                }
              >Add List</Button>
            </div>        
            <div>
              <Button  
                  className="btn btn-danger"
                  onClick={() => this.props.clearList()}
                >
                  Clear all<span> &#x2715; </span>
                </Button>
            </div>
          </Form>

        </div>
        <div>
          { this.renderReminders() }
        </div>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addList}, dispatch);
// }

function mapStateToProps(state) {
  console.log('App.js - mapStateToProps: ', state);
  return {
    reminders: state
  }
}


//export default connect(null, mapDispatchToProps)(App);
                                          //binded functions from actions/index.js                                  
export default connect(mapStateToProps, { addList, deleteList, clearList })(App);
