// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
