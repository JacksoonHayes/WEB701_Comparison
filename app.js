const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

// Connect to routes
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// CORS Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Hello World! Grow & Give Homepage');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port)
    console.log('http://localhost:' + port)
});