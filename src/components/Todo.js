import React, { useState } from 'react';

const todo = (props) => {
  const [todoState, setTodoState] = useState('');

  const inputChangeHandler = (event) => {
    setTodoState(event.target.value);
  };

  return <React.Fragment>
    <input
      type="text"
      placeholder="Todo"
      value={todoState}
      onChange={inputChangeHandler} />
    <button>Add</button>
    <ul>

    </ul>
  </React.Fragment>
};

export default todo;