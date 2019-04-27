import React, { useState } from 'react';

import AuthContext from './components/auth-context';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const app = () => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);
  
  const switchPageHandler = (page) => {
    setPage(page);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header
          onLoadAuth={switchPageHandler.bind(this, 'auth')}
          onLoadTodos={switchPageHandler.bind(this, 'todos')} />
        <hr />
        {page === 'auth' ? <Auth /> : <Todo />}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
