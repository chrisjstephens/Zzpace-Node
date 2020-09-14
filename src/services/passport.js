const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user.js');
const keys = require('../config/keys.js');

// Create local strategy used for /login route
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false

  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //looks at request header in authorization & decodes to original jwl before encode
  secretOrKey: keys.jwtSecret
};

// Create JWT strategy used to 'authenticate' by matching current user JWT token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload = decoded jwtToken via JWT strategy
  // See if the username in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  //Udemy video recommended to use - User.findById(payload.sub), I have changed to findOne({username: payload.sub})
  User.findOne({ username: payload.sub }, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
