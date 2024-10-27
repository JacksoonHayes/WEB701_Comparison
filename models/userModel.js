const mongoose = require('mongoose');

// User Schema for MongoDB
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    vouchers: {
        type: Number,
        default: 10
    }
});

// Static method to find user by ID
UserSchema.statics.getUserById = async function(id) {
    try {
        const user = await this.findById(id);  // Use async/await to wait for the result
        return user;
    } catch (error) {
        throw error;  // Let the caller handle the error
    }
};

const User = mongoose.model('User', UserSchema); // Create a model from the schema
module.exports = User;
