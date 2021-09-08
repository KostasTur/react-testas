import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { UserContext } from './App';
// import axios from 'axios';
// Pages
import TeamsPage from './pages/TeamsPage';

const ProtectedRoute = () => {
  // Hooks
  // -- context
  // const { userState, setUserState } = useContext(UserContext);
  // -- redirects
  const history = useHistory();

  // ref for variable used in useEffect
  //   const userId = useRef(localStorage.getItem('user'));
  //   const dataExists = useRef(userState);
  // -- side effects
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/login');
    }
    // if (!dataExists.current) {
    //   axios
    //     .get(
    //       `https://car-adverts-react.herokuapp.com/api/users/${userId.current}`
    //     )
    //     .then((res) => {
    //         setUserState(res.data);
    //       console.log('fetche');
    //     })
    //     .catch((err) => console.log('err', err));
    // }
    console.log('protected route effect');
  }, [history]);

  return <>{<TeamsPage />}</>;
};

export default ProtectedRoute;
