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
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// API Routes
app.use('/api/user', require('./routes/api/users'));
app.use('/api/table', require('./routes/api/table'));

// Serving React App
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server Start
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
})