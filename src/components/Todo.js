import React, { useState } from 'react';
import axios from 'axios';

const todo = (props) => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  // Could also use single state eg:
  // const [todoData, setTodoData] = useState({ name: '', list: [] });

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    setTodoName('');
    axios.post('https://todo-f81e0.firebaseio.com/todo.json', { name: todoName })
      .then(console.log)
      .catch(console.log);
  };

  return <React.Fragment>
    <input
      type="text"
      placeholder="Todo"
      value={todoName}
      onChange={inputChangeHandler} />
    <button onClick={todoAddHandler}>Add</button>
    <ul>
      {todoList.map((todo, index) => <li key={index}>{todo}</li>)}
    </ul>
  </React.Fragment>
};

export default todo;