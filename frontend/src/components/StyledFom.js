import styled from 'styled-components';
export const StyledForm = styled.form`
  padding: 20px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  min-width: 35vw;
  width: 100%;
  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label {
      margin-bottom: 10px;
    }
    input {
      padding: 6px 15px;
      outline: none;
      border: none;
      background-color: #f4f4f4;
    }
    input[type='submit'] {
      width: 150px;
      background-color: #1f6df3;
      color: white;
      cursor: pointer;
    }
  }
`;
