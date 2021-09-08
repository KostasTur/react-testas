import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// styled component
import { StyledForm } from '../components/StyledFom';

// Styled style :)
const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .signUpMessage,
  .loginMessage {
    padding-left: 10px;
    border-left: 10px solid red;
    border-radius: 2px;
  }
  @media screen and (min-width: 1024px) {
    justify-content: space-between;

    .login-signup-container {
      display: flex;
      justify-content: space-between;
    }
    #login,
    #signup {
      width: calc(100% / 2 - 30px);
    }
  }
`;

const LoginPage = () => {
  // Hooks
  // -- global context
  // -- context
  const { setUserIdState } = useContext(UserContext);
  // --- local state

  // ---- login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // ---- signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupImage, setSignupImage] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  // --- redirects
  const history = useHistory();

  //   refs
  const inputRef = useRef();
  const singupPasswordRef = useRef();
  const singupEmailRef = useRef();

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post('https://react-testas.herokuapp.com/login', {
        email: loginEmail,
        password: loginPassword,
      })
      .then((res) => {
        const userId = res.data.team_id;
        localStorage.setItem('user', userId);
        setUserIdState(userId);
        history.push('/teams');
      })
      .catch((err) => {
        setLoginEmail('');
        setLoginPassword('');
        console.log(err);
        setLoginErrorMessage(err.response.data.message);
        inputRef.current.focus();
      });
  };

  const signupUser = (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setSignupErrorMessage('Passwords do not match!');
      setSignupPassword('');
      setSignupConfirmPassword('');
      singupPasswordRef.current.focus();
      return;
    }
    axios
      .post('https://react-testas.herokuapp.com/signup', {
        name: signupName,
        email: signupEmail,
        image: signupImage,
        password: signupPassword,
      })
      .then((res) => {
        if (res.data.registrationStatus === 'failed') {
          console.log(res);
          setSignupErrorMessage(res.data.message);
          setSignupPassword('');
          setSignupConfirmPassword('');
          singupEmailRef.current.focus();
        } else if (res.data.registrationStatus === 'success') {
          console.log(res);
          const userId = res.data.team_id;
          localStorage.setItem('user', userId);
          setUserIdState(userId);
          history.push('/teams');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <StyledLogin>
        <section>
          <h1>Login or Signup Your Team</h1>
        </section>

        <div className='login-signup-container'>
          <section id='login'>
            <h2>Login</h2>

            <StyledForm id='logInForm' className='form' onSubmit={loginUser}>
              <div className='form-control'>
                <label className='form-label' htmlFor='loginEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  ref={inputRef}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='loginPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <input type='submit' value='Log In' />
              </div>
            </StyledForm>
            {loginErrorMessage && (
              <p className='loginMessage'>{loginErrorMessage}</p>
            )}
          </section>
          <section id='signup'>
            <h2>Sign Up New Team</h2>

            <StyledForm onSubmit={signupUser}>
              <div className='form-control'>
                <label className='form-label' htmlFor='signUpName'>
                  Team Name
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='email'
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  ref={singupEmailRef}
                  required
                />
              </div>
              <div className='form-control'>
                <label className='form-label' htmlFor='signUpImage'>
                  Team Logo
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={signupImage}
                  onChange={(e) => setSignupImage(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  ref={singupPasswordRef}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpConfirmPassword'>
                  Confirm Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <input
                  type='submit'
                  value='Sign Up'
                  className='btn-primary btn-primary-submit'
                />
              </div>
            </StyledForm>
            {signupErrorMessage && (
              <p className='signUpMessage'>{signupErrorMessage}</p>
            )}
          </section>
        </div>
      </StyledLogin>
    </main>
  );
};

export default LoginPage;
