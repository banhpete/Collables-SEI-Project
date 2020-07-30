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

  // Hash Password when user is first saved or if password is changed
  if (user.isModified('password')) {
    // password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
      if (err) return next(err);
      // replace the user provided password with the hash
      user.password = hash;
      return next();
    });
  }

  return next();
});

userSchema.methods.updateRecent = function (tableIdx, cb) {
  let currentIdx = this.recentTables.findIndex((ele) => ele === tableIdx)
  if (currentIdx !== -1) {
    this.recentTables.splice(currentIdx, 1)
    this.recentTables.push(tableIdx)
  } else {
    if (this.recentTables.length === 4) {
      this.recentTables.shift();
      this.recentTables.push(tableIdx);
    } else {
      this.recentTables.push(tableIdx);
    }
  }

  cb()
}

userSchema.methods.comparePassword = function (tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);