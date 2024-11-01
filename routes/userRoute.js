const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const userController = require('../controllers/userController');

// Register route
router.post('/register', async (req, res) => {
    try {
        console.log("Starting registration process..."); // Log the start of the registration process
        const result = await userController.addUser(req);
        return res.status(201).json(result);  // Send response here
    } catch (error) {
        // Ensure the error response is returned only once
        if (error.message === 'Email is already registered') { // Check if the error is due to duplicate email
            return res.status(400).json({ success: false, msg: error.message });
        } else {
            return res.status(500).json({ success: false, msg: error.message });
        }
    }
});


// Authenticate route
router.post('/authenticate', async (req, res, next) => {
    const { email, password } = req.body; // use email and password from request body

    console.log("Starting authentication process...");

    try {
        const user = await userController.getUserByEmail(req, res); // Get user by email. method is in userController.js
        
        // Check if the user exists
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        console.log("User found, comparing password...");

        const isMatch = await userController.comparePassword(password, user.password); // Compare password with database. method is in userController.js

        // Check if the password matches
        if (isMatch) {
            console.log("Password matched, generating token...");

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 21600 // 6 hours in seconds
            });

            console.log("Token generated, sending response...");
            
            // Send the response
            return res.json({ 
                success: true,
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            console.log("Password mismatch."); // Loginm password mismatch
            return res.status(401).json({ success: false, msg: 'Wrong password' }); // Send response for wrong password
        }
    } catch (error) {
        console.error("Error occurred during authentication:", error.message);
        // Ensure the error response is returned only once
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// Profile route with JWT authentication middleware
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => { // Use passport.authenticate middleware to authenticate the request
    return res.json({ user: req.user });
});

// Update route with JWT authentication middleware to update user password
router.put('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await userController.updatePassword(req.user.id, req.body.newPassword); // Update password method is in userController.js
        return res.status(200).json({ success: true, message: 'Password updated successfully' }); // Send successful response
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message }); // Send error response
    }
});

// Redeem token route with JWT authentication middleware to redeem a token
router.post('/redeem-token', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await userController.getUserById(req.user.id); // Get user by ID
        // Check if the user has any tokens to redeem
        if (user.vouchers > 0) {
            user.vouchers -= 1;
            await user.save();
            return res.status(200).json({ success: true, vouchers: user.vouchers, message: 'Token redeemed successfully!' });
        } else {
            return res.status(400).json({ success: false, message: 'No tokens available to redeem!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
