import React, { useState, useEffect, useRef, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// pages
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
// context
export const UserContext = createContext();

function App() {
  // hooks
  // -- global state
  const [userIdState, setUserIdState] = useState();

  // refs
  const userId = useRef(localStorage.getItem('user'));

  // side effects
  useEffect(() => {
    if (userId) {
      setUserIdState(userId.current);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userIdState, setUserIdState }}>
        <Router>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path='/teams' component={ProtectedRoute} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
