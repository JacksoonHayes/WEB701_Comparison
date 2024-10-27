import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updatePassword, redeemToken } from '../../services/authService';
import './profile.css';

// The Profile component is a functional component that renders the user profile page.
const Profile = () => {
  const [user, setUser] = useState(null); // Declare the user state variable
  const [newPassword, setNewPassword] = useState(''); // Declare the newPassword state variable
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile(); // Call the getProfile function to fetch the user profile
      if (profile && profile.user) {
        setUser(profile.user); // Set user data 
      } else {
        navigate('/login'); // Redirect to login if no profile data
      }
    };

    // Call the fetchProfile function
    fetchProfile();
  }, [navigate]);

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!newPassword) { // Check if the new password is empty
      alert('Please enter a new password.');
      return;
    }

    // Call the updatePassword function with the new password
    const response = await updatePassword(newPassword);
    if (response.success) { // Check if the password was updated successfully
      alert('Password updated successfully!');
      setNewPassword(''); // Clear the newPassword state
    } else {
      alert('Failed to update password. Please try again.');
    }
  };

  // Handle redeeming token
  const handleRedeemToken = async () => {
    const response = await redeemToken(); // Call the redeemToken function
    if (response && response.vouchers) {
      setUser({ ...user, vouchers: response.vouchers }); // Update the user state with the new voucher count
      alert('Token redeemed successfully!');
    } else {
      alert('Failed to redeem token.');
    }
  };

  // Render the user profile page
  return (
    <div className="container" id="profile-container">
      {user ? (
        <div className="row">
          {/* Left Column: User Details */}
          <div className="col-md-5">
            <h2 className="page-header">Hello, {user.name}!</h2>
            <ul className="list-group" id="profile-list-group">
              <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
              <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
            </ul>
          </div>

          {/* Right Column: Update Password and Redeem Voucher */}
          <div className="col-md-4 offset-md-1">
            <h4>Update Your Password:</h4>
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group" id="profile-form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-custom mt-4" id="profile-btn">Submit Changes</button>
              </div>
            </form>

            <hr className="my-5" />

            <div className="token-section mt-4 text-center">
              <h4>Available Vouchers</h4>
              <p>You currently have: <strong>{user.vouchers}</strong> vouchers</p>
              <button
                type="button"
                className="btn btn-success btn-success-custom mt-2"
                onClick={handleRedeemToken}
                id="profile-redeem-btn"
              >
                Redeem a Voucher
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
