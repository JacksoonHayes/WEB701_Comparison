const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Import the model

// Add new user
exports.addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hash });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Compare password
exports.comparePassword = async (candidatePassword, userPasswordHash) => {
    try {
        return await bcrypt.compare(candidatePassword, userPasswordHash);
    } catch (error) {
        throw error;
    }
}
