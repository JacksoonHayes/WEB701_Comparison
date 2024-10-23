import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;
/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path based on your structure

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default login state

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<div>Login Page Placeholder</div>} />
        <Route path="/register" element={<div>Register Page Placeholder</div>} />
        <Route path="/profile" element={isLoggedIn ? <div>Profile Page Placeholder</div> : <div>Please log in</div>} />
      </Routes>
    </Router>
  );
}

export default App;

*/