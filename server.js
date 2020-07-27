const express = require('express')
const logger = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')

require('./config/database')

var app = express()

// Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))

app.get('/api/test', (req, res, next) => {
  res.json({ 'message': "hello" })
})

app.post('/api/test2', (req, res, next) => {
  console.log(req)
  res.json({ message: 'return' })
})

app.listen(3001, function () {
  console.log("Hi, I'm running on 3000")
})