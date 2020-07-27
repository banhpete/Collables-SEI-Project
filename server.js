const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

require('dotenv').config();
require('./config/database');

var app = express();

// Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api/users', require('./routes/api/users'));

// Serving React App


// Server Start
app.listen(3001, function () {
  console.log("Hi, I'm running on 3000")
})