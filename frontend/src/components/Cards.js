import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Button } from './Button';
import styled from 'styled-components';

const StyledCards = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4vw;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }
`;
const StyledCard = styled.div`
  border: 1px solid grey;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  img {
    width: 80%;
  }
  .buttons {
    width: 100%;
  }
`;
const Cards = ({ data, vote }) => {
  const { userIdState } = useContext(UserContext);
  return (
    <StyledCards>
      {data
        .sort((a, b) => b.score - a.score)
        .map((item) => (
          <StyledCard key={item._id}>
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <h2>Score: {item.score}</h2>
            <div className='buttons'>
              <Button up onClick={() => vote(userIdState, item._id, 1)}>
                +
              </Button>
              <Button down onClick={() => vote(userIdState, item._id, -1)}>
                -
              </Button>
            </div>
          </StyledCard>
        ))}
    </StyledCards>
  );
};

export default Cards;
