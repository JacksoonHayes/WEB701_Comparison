// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');

// Load environment variables
dotenv.config();
connectDB();

// Create express app
const app = express();

// Environment variables
const port = process.env.PORT || 3000;

// Middleware configuration
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

// Session configuration
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Passport setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/users', userRoute);


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});


// Server startup
app.listen(port, () => {
    console.log(`Server started successfully: http://localhost:${port}`);
});
