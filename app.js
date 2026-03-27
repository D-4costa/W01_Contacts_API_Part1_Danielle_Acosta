require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// 🔹 ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));
app.use('/tasks', require('./routes/tasks')); 

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'Server error',
        error: err.message
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
