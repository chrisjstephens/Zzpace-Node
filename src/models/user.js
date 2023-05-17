const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  username: {type: String, unique: true, lowercase: true, minlength: [8, 'Username must be 8 characters minimum'], maxlength: [20, 'Username must be less then 20 characters'], required: [true, 'Username is required']},
  password: {type: String, minlength: [8, 'Password must be 8 characters minimum'], required: true},
  type: {type: String, default: 'customer'},
  info: {
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    gender: {type: String, default: ''},
    address: {type: String, default: ''},
    country: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    dateOfBirth: {type: String, default: ''}
  }
  });
//Before save, below runs taken/modified from udemy course
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();

    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('user', userSchema);
