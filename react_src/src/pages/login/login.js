import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, storeUserData } from '../../services/authService.js';
import './login.css';

// The Login component is a functional component that renders a login form.
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState(''); // Declare the email state variable and its setter function
  const [password, setPassword] = useState(''); // Declare the password state variable and its setter function
  const navigate = useNavigate(); 

  // The onLoginSubmit function is an asynchronous function that handles the form submission.
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Create a user object with the email and password
    const user = {
      email,
      password,
    };

    // Call the authenticateUser function with the user object
    const response = await authenticateUser(user);
    if (response.success) {
      storeUserData(response.token, response.user); // Store the token and user data in localStorage
      setIsLoggedIn(true); // Set the isLoggedIn state to true
      alert('You are now logged in.');
      navigate('/profile'); // Redirect the user to the profile page
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };
 
  // The return statement renders the login form. The form has two input fields for email and password, and a submit button.
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

