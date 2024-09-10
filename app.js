const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

const users = require('./routes/users');

// CORS Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());

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