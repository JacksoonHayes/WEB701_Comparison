const API_URL = 'http://localhost:3000/users';

// Authenticate the user by making a POST request to the backend
export const authenticateUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, { // Make a POST request to the backend to authenticate the user
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(user), // Convert the user object to a JSON
    });
    return await response.json(); // Return the response as JSON
  } catch (error) {
    console.error('Error during authentication:', error);
    return { success: false, message: 'Authentication failed.' };
  }
};

// Register a new user by making a POST request to the backend
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/register`, { // Make a POST request to the backend to register a new user
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // Convert the user object to a JSON
    });
    return await response.json(); // Return the response as JSON
  } catch (error) { 
    console.error('Error during registration:', error);
    return { success: false, message: 'Registration failed.' };
  }
};

// Store the user token and data in localStorage
export const storeUserData = (token, user) => {
  localStorage.setItem('token', token); // Store the token in localStorage
  localStorage.setItem('user', JSON.stringify(user)); // Store the user object in localStorage
};

// Fetch user profile using the stored token
export const getProfile = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/users/profile', { // Make a GET request to the backend to fetch the user profile
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      });
      return await response.json(); // Return the response as JSON
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }
  return null;
};

// Update user password
export const updatePassword = async (newPassword) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) { // Check if the token exists
    try {
      // Make a PUT request to the backend to update the user password
      const response = await fetch('http://localhost:3000/users/update', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
        body: JSON.stringify({ newPassword }), // Convert the new password to JSON
      });
      return await response.json(); // Return the response as JSON
    } catch (error) {
      console.error('Error updating password:', error); 
      return { success: false };
    }
  }
  return { success: false };
};

// Redeem token for vouchers
export const redeemToken = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    try { 
      // Make a POST request to the backend to redeem the token
      const response = await fetch('http://localhost:3000/users/redeem-token', { 
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the token
        },
      });
      return await response.json(); // Return the response as JSON
    } catch (error) {
      console.error('Error redeeming token:', error); 
      return null;
    }
  }
  return null;
};


// Check if the user is logged in based on the presence of the token
export const isLoggedIn = () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  return token !== null; // Return true if the token exists, false otherwise
};

// Logout the user by clearing the token and user data from localStorage
export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
  localStorage.removeItem('user'); // Remove the user object from localStorage
};

// Optional: You can add more functions for password update or token redemption
