const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.addUser);

// Authenticate route
router.post('/authenticate', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userController.getUserByEmail(req, res);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isMatch = await userController.comparePassword(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 21600 // 6 hours
            });

            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.json({ success: false, msg: 'Wrong password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
});

// Profile route
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
