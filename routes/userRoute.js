const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const userController = require('../controllers/userController');

// Register route
router.post('/register', async (req, res) => {
    try {
        console.log("Starting registration process...");
        const result = await userController.addUser(req);
        return res.status(201).json(result);  // Send response here
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// Authenticate route
router.post('/authenticate', async (req, res, next) => {
    const { email, password } = req.body;

    console.log("Starting authentication process...");

    try {
        const user = await userController.getUserByEmail(req, res);
        
        // Check if the user exists
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        console.log("User found, comparing password...");

        const isMatch = await userController.comparePassword(password, user.password);

        // Check if the password matches
        if (isMatch) {
            console.log("Password matched, generating token...");

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 21600 // 6 hours
            });

            console.log("Token generated, sending response...");

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
            console.log("Password mismatch.");
            return res.status(401).json({ success: false, msg: 'Wrong password' });
        }
    } catch (error) {
        console.error("Error occurred during authentication:", error.message);
        // Ensure the error response is returned only once
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// Profile route with JWT authentication
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ user: req.user });
});

router.put('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await userController.updatePassword(req.user.id, req.body.newPassword);
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// Redeem token route
router.post('/redeem-token', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await userController.getUserById(req.user.id);
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
