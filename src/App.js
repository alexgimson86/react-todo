import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const uuidv4 = require('uuid/v4')
const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
};
const TodoItem = (props) => {
  let f = props.finished;
  var cl;
  if(f){
    cl = 'Done'
  }else{
    cl= 'Not'
  }
  return(
    <li  className={cl} id={props.name} onClick ={props.edit}>{props.text}<button name={props.name} onClick ={props.delete}>X</button></li>);
}


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      todos: [],
      newTodo: '',
      completed: []
    }
    
  } 
  handleSubmit = (e) => {
    e.preventDefault();
    const todos = [...this.state.todos, this.state.newTodo];
    const completed = [...this.state.completed, false];

    this.setState({todos, newTodo: '', completed });
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }
  handleDelete= (e) => {
   let tempArr = this.state.todos;
   let compArr = this.state.completed;
   compArr.splice(e.target.name, 1)
   tempArr.splice(e.target.name, 1);
   this.setState({
     todos: tempArr,
     completed: compArr
   })
  }
  handleEdit = (e) => {
    let index = e.target.id;
    let completed = this.state.completed;
    completed[index] = true
    this.setState({ completed });
  }
  render() {
    const {newTodo} = this.state;
    const todos = this.state.todos.map((text,i)=>(
      <TodoItem 
      key={uuidv4(v4options)} 
      name={i}
      text={text} 
      finished={this.state.completed[i]}
      delete={this.handleDelete}
      edit={this.handleEdit}/>

    ));
    return (
      <div className="App">
       <h1>Simple todo</h1>
       <form onSubmit={this.handleSubmit}>
         <input 
          className="todo-input"
          autoComplete="off"
          type="text"
          name="newTodo"
          placeholder="what needs to be done"
          value={newTodo}
          onChange={this.handleChange}
          />
          <button type="submit" className="save-button">
            SAVE
          </button>
         </form>
         <div className="todo-content">
         <ol>
           {todos}
         </ol>
          </div>
      </div>
    );
  }
}

export default App;
