const express = require('express')
const router = express.Router()
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');


router.get('/test', (req, res, next) => {
  res.json({ 'message': "hello" })
})

router.post('/signup', usersCtrl.createUser)

module.exports = router