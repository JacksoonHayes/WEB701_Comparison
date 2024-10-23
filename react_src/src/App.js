import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.js';
import Login from './pages/login.js'
import Register from './pages/register.js';
import Profile from './pages/profile.js';
import 'bootswatch/dist/lux/bootstrap.css';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
