import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegister, validateEmail } from '../../services/validationService';
import { registerUser } from '../../services/authService';
import './register.css';

// The Register component is a functional component that renders a registration form.
const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' }); // Declare the user state variable
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  // The onRegisterSubmit function is an asynchronous function that handles the form submission.
  const onRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateRegister(user)) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate email format
    if (!validateEmail(user.email)) {
      alert('Please use a valid email address.');
      return;
    }

    // Proceed with registration
    const response = await registerUser(user);
    if (response.success) { // Check if the registration was successful
      alert('You are now registered and can log in.');
      navigate('/login'); // Redirect the user to the login page
    } else {
      alert('Something went wrong. Please try again.');
      navigate('/register'); // Redirect the user to the registration page
    }
  };

  // The return statement renders the registration form. The form has input fields for name, email, password, and a submit button.
  return (
    <div className="container" id="register-container">
      <h2 className="page-header">Register</h2>
      <form onSubmit={onRegisterSubmit}>
        <div className="form-group" id="register-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div className="text-center">
          <input type="submit" className="btn btn-custom" id="register-btn" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
