const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Import the model

// Add new user
exports.addUser = async (req) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If the user exists, return an error message
            throw new Error('Email is already registered');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = new User({ name, email, password: hash });
        await newUser.save();

        return { success: true, message: "User registered successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
}


// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
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

// Update user password
exports.updatePassword = async (userId, newPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(userId, { password: hash });
        return { success: true, message: 'Password updated successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

