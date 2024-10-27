import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.css';
import './index.css';
import './pages/login/login.css';
import Navbar from './components/nav/navbar.js';
import Login from './pages/login/login.js';
import Register from './pages/register/register.js';
import Profile from './pages/profile/profile.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The Router component is the root component for the app=. It wraps the entire application and provides the routing functionality.
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
