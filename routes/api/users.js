const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/users');


router.get('/test', (req, res, next) => {
  res.json({ 'message': "hello" })
})

router.post('/signup', usersCtrl.createUser)

router.post('/login', usersCtrl.loginUser)

module.exports = router