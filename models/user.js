const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unqiue: true,
    minlength: 4,
    maxlength: 30,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  userTables: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
  },
  sharedTables: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
  },
  recentTables: {
    type: [String],
  }
}, {
  timestamps: true
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function (next) {
  // 'this' will be set to the current document
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);