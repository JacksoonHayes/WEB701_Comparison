import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, storeUserData } from '../../services/authService.js';
import './login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const response = await authenticateUser(user);
    if (response.success) {
      storeUserData(response.token, response.user);
      setIsLoggedIn(true);
      alert('You are now logged in.');
      navigate('/profile');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };
 
  return (
    <div className="container" id="login-container">
      <h2 className="page-header">Login</h2>
      <form onSubmit={onLoginSubmit}>
        <div className="form-group" id="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </div>
        <div className="form-group" id="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
        </div>
        <div className="text-center">
          <input type="submit" className="btn btn-custom" value="Submit" id="login-btn"/>
          <a className="btn btn-custom" href="/register" id="login-btn">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

