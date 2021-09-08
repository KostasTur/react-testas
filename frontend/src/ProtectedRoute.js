import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Pages
import TeamsPage from './pages/TeamsPage';

const ProtectedRoute = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/');
      return;
    }
  }, [history]);

  return (
    <>
      <TeamsPage />
    </>
  );
};

export default ProtectedRoute;
