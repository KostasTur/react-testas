import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: ${({ logout }) => (logout ? `5px` : `none`)};
  width: ${({ logout }) => (logout ? `` : `50%`)};
  font-size: 2rem;
  font-weight: 500;
  margin-top: 10px;
  padding: ${({ logout }) => (logout ? `10px 35px` : `7px 45px`)};
  outline: none;
  background-color: ${({ up, down, logout }) =>
    up ? `#1A9018` : down ? `#ebe9e9` : logout ? `#1f6df3` : `transparent`};
  color: ${({ up, down, logout }) =>
    up ? `#fff` : down ? `#000` : logout ? `#fff` : `#000`};
  cursor: pointer;
`;
