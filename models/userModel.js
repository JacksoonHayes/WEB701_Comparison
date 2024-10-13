const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
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
        const user = await this.findById(id);  // Use async/await
        return user;
    } catch (error) {
        throw error;  // Let the caller handle the error
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
