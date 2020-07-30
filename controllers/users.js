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

function loginUser(req, res, next) {
  User.findOne({ username: req.body.username }).populate('userTables', 'tableName').populate('sharedTables', 'tableName')
    .then((user) => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = createJWT(user)
          res.json({ token })
        } else {
          return res.status(401).json({ err: 'bad credentials' });
        }
      })
    })
    .catch((err) => {
      return res.status(401).json(err)
    })
}

module.exports = { createUser, loginUser }