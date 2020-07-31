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
        const token = createJWT(user)
        res.json({ token })
      }
    )
    .catch(
      (err) => {
        res.status(400).json(err)
      }
    )
}

function loginUser(req, res, next) {
  User.findOne({ username: req.body.username }).select("-userTables").select("-sharedTables").select("-recentTables")
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

function getUserData(req, res, next) {
  console.log('hi')
  User.findOne({ username: req.user.username }).populate('userTables', 'tableName').populate('sharedTables', 'tableName')
    .then((user) => {
      if (!user) return res.status(401).json({ errMsg: 'Username not found' })
      return res.json(user)
    })
}


module.exports = { createUser, loginUser, getUserData }