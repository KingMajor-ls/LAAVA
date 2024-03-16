import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { setUsername } from './Reducer';
import '../Styles/Login.css';
import Footer from './Footer';

import '../Styles/Footer.css';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // handle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLoginClicK = () => {
    navigator('/');
  };

  const handleLoginClick = (event) => {
    event.preventDefault(); // Prevent form submission


    fetch('http://localhost:8080/farmers')
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find(
          (user) =>
            user.username == usernameInput && user.password == passwordInput
        );

        if (foundUser) {
          dispatch(setUsername(foundUser.username));
          // Redirect to the dashboard page
          navigate('/home');
        } else {
          // Show error message or handle invalid credentials
          alert('Invalid login credentials');

        }
      });
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="login">
        <div className='background'>
          <form onSubmit={handleLoginClick}>
            <input
              type="text"
              placeholder="Username"
              className="username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />

            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button className='buttonToggle' type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </button>
            </div>

            <div className="homepage">
              <button type="submit" className="btn1">
                Login
              </button>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className='forgot-password'>
              <Link to="/Signup" onClick={handleLoginClicK}>
                <h4 > Don't have an account ? Signup</h4>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className='footer'>
        <Footer /></div>
    </div>
  );
};

export default Login;




