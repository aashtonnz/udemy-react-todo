import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = (props) => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  // Could also use single state eg:
  // const [todoData, setTodoData] = useState({ name: '', list: [] });
  // const todoInputRef = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.id);
      default:
        return state;
    }
  };
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get('https://todo-f81e0.firebaseio.com/todo.json')
      .then(response => {
        console.log(response);
        const todoData = response.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        // setTodoList(todos);
        dispatch({ type: 'SET', payload: todos });
      })
      .catch(console.log);
  }, []);

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   // Return clean up function
  //   return () => {
  //     console.log('Clean up');
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   };
  // }, []);

  const mouseMoveHandler = (event) => {
    console.log(event.clientX, event.clientY);
  };

  // const inputChangeHandler = (event) => {
  //   setTodoName(event.target.value);
  // };

  const todoAddHandler = () => {
    const todo = { name: todoInput.value };
    axios.post('https://todo-f81e0.firebaseio.com/todo.json', todo)
      .then((response) => {
        console.log(response);
        todo.id = response.data.name;
        // setTodoList(todoList.concat(todo));
        dispatch({ type: 'ADD', payload: todo });
      })
      .catch(console.log);
  };

  const todoRemoveHandler = (id) => {
    axios.delete(`https://todo-f81e0.firebaseio.com/todo/${id}.json`)
      .then(_res => {
        dispatch({ type: 'REMOVE', id });
      })
      .catch(console.log);
  };

  // const inputValidationHandler = (event) => {
  //   setInputIsValid(event.target.value.trim() !== '');
  // };

  return <React.Fragment>
    <input
      type="text"
      placeholder="Todo"
      // value={todoName}
      // onChange={inputChangeHandler} />
      // ref={todoInputRef}
      // onChange={inputValidationHandler}
      value={todoInput.value}
      onChange={todoInput.onChange}
      style={{ backgroundColor: todoInput.validity ? 'transparent' : 'red' }} />
    <button onClick={todoAddHandler}>Add</button>
    <ul>
      {
        useMemo(() => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ), [todoList])
      }
    </ul>
  </React.Fragment>
};

export default todo;