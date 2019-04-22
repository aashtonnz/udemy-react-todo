import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = (props) => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  // Could also use single state eg:
  // const [todoData, setTodoData] = useState({ name: '', list: [] });

  useEffect(() => {
    axios.get('https://todo-f81e0.firebaseio.com/todo.json')
      .then(response => {
        console.log(response);
        const todoData = response.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);
    // Return clean up function
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  const mouseMoveHandler = (event) => {
    console.log(event.clientX, event.clientY);
  };

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat({ name: todoName }));
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
      {todoList.map((todo, index) => <li key={index}>{todo.name}</li>)}
    </ul>
  </React.Fragment>
};

export default todo;