// server1.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulated user database
const users = {
    'user1': 'password1',
    'user2': 'password2'
};

// Handle POST request for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        // Redirect or send success response
        res.redirect('/home.html');
    } else {
        // Send failure response
        res.status(401).send('Invalid credentials');
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});