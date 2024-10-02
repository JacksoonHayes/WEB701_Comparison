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

const User = mongoose.model('User', UserSchema);
module.exports = User;
