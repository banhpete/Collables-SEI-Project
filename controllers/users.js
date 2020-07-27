const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}

function createUser(req, res, next) {
  User.create(req.body)
    .then(
      (user) => {
        console.log(user)
        const token = createJWT(user)
        res.json({ token })
      }
    )
    .catch(
      (err) => {
        console.log(err)
        res.status(400).json(err)
      }
    )
}

module.exports = { createUser }