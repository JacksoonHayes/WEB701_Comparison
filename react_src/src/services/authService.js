const API_URL = 'http://localhost:3000/users';

// Authenticate the user by making a POST request to the backend
export const authenticateUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Error during authentication:', error);
    return { success: false, message: 'Authentication failed.' };
  }
};

// Register a new user by making a POST request to the backend
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'Registration failed.' };
  }
};

// Store the user token and data in localStorage
export const storeUserData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Fetch user profile using the stored token
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }
  return null;
};

// Update user password
export const updatePassword = async (newPassword) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating password:', error);
      return { success: false };
    }
  }
  return { success: false };
};

// Redeem token for vouchers
export const redeemToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/users/redeem-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error redeeming token:', error);
      return null;
    }
  }
  return null;
};


// Check if the user is logged in based on the presence of the token
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

// Logout the user by clearing the token and user data from localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Optional: You can add more functions for password update or token redemption
