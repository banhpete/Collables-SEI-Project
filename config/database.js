const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/collables-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connect', function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
})