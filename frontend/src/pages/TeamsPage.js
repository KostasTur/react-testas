import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
// componets
import Cards from '../components/Cards';
import { Button } from '../components/Button';
// Styled style :)
const StyledTeamsMain = styled.main`
  max-width: 1024px;
  margin: 20px auto;
  @media (max-width: 1000px) {
    margin: 0px 15px;
  }
`;
const TeamsPage = () => {
  // hooks
  // state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //   context
  const { setUserIdState } = useContext(UserContext);
  // --- redirects
  const history = useHistory();
  // side effects
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const response = await axios.get(
        `https://react-testas.herokuapp.com/teams/${localStorage.getItem(
          'user'
        )}`
      );
      console.log(response);
      if (isMounted);
      if (response.data.message === 'failed') {
        alert('ups smth is wrong with you identification');
        history.push('/');
      }
      setData(response.data);
      setLoading(false);
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [history]);
  // custom functions
  //   voting functions updates state and sends post request to the server
  const vote = (votingTeam, itemId, num) => {
    const newData = data.map((item) => {
      if (item._id === itemId) {
        let voted = item.voted_by.includes(votingTeam);
        if (voted) {
          alert('already voted for this team!');
          return item;
        }
        axios.post('https://react-testas.herokuapp.com/vote', {
          votingTeam,
          itemId,
          num,
        });
        let votesArr = item.voted_by;
        votesArr.push(votingTeam);
        return { ...item, score: item.score + num, voted_by: votesArr };
      } else return item;
    });
    setData(newData);
  };
  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUserIdState('');
    setData('');
    history.push('/');
  };

  return (
    <>
      {loading ? (
        <StyledTeamsMain>
          <h2>...Loading...</h2>
        </StyledTeamsMain>
      ) : (
        <StyledTeamsMain>
          <Button logout onClick={logoutHandler}>
            Logout
          </Button>

          <Cards data={data} vote={vote} />
        </StyledTeamsMain>
      )}
    </>
  );
};

export default TeamsPage;
