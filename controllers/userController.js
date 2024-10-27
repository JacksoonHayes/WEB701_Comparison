const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Import the model

// Add new user to the database
exports.addUser = async (req) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If the user exists, return an error message
            throw new Error('Email is already registered');
        }

        // Hash the password before saving it to the database using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the new user record
        const newUser = new User({ name, email, password: hash });
        await newUser.save();
        
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
}


// Get user by email address
exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email address in the database. built in method of mongoose
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

// Get user by ID
exports.getUserById = async (id) => {
    try {
        // Find the user by ID in the database using the static method from userModel.js
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found'); // Throw an error if the user is not found
        }
        return user; // Return the user object if found
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`); 
    }
}

// Compare input password with hashed password in the database
exports.comparePassword = async (candidatePassword, userPasswordHash) => {
    try {
        return await bcrypt.compare(candidatePassword, userPasswordHash); // Compare the passwords
    } catch (error) {
        throw error;
    }
}

// Update user password in the database
exports.updatePassword = async (userId, newPassword) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt for the new password
        const hash = await bcrypt.hash(newPassword, salt); // Hash the new password
        await User.findByIdAndUpdate(userId, { password: hash }); // Update the user's existing password
        return { success: true, message: 'Password updated successfully' }; // Return a success message
    } catch (error) {
        throw new Error(error.message);
    }
};

