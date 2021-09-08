import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { UserContext } from './App';
// import axios from 'axios';
// Pages
import TeamsPage from './pages/TeamsPage';

const ProtectedRoute = () => {
  const history = useHistory();
  // simple validation using local storage
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/login');
    }

    console.log('protected route effect');
  }, [history]);

  return <>{<TeamsPage />}</>;
};

export default ProtectedRoute;
