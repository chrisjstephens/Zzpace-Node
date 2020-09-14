var express = require('express');
var jwt = require('jwt-simple');
var User = require('../models/user.js');
var keys = require('../../src/config/keys.js')

//Used a udemy tutorial and tweaked it a bit - https://www.udemy.com/course/react-redux-tutorial/learn/lecture/4755164
//https://www.bu.edu/tech/about/security-resources/bestpractice/auth/

function tokenForUser(user) {
  const timestampDate = new Date().getTime();
  return jwt.encode({ sub: user.username, iat: timestampDate }, keys.jwtSecret);  //TODO: Add in expire logic 15min
}

// function decodeTokenForUser(token) {
//   return jwt.decode( token, keys.jwtSecret);
// } NOT NEEDED NOW

// exports.signup = function(req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const type = req.body.type;
//
//   if (!username || !password|| !type) {
//     return res.status(422).send({ error: 'You must provide a username,password and type'});
//   }
//
//   User.findOne({ username: username }, function(err, existingUser) {
//     if (err) { return next(err); }
//
//     if (existingUser) {
//       return res.status(422).send({ error: 'Username is in use' });
//     }
//
//     const user = new User({
//       username: username,
//       password: password,
//       type: type
//     });
//
//     user.save(function(err) {
//       if (err) { return next(err); }
//
//       // Repond to request indicating the user was created
//       res.json({ token: tokenForUser(user) });
//     });
//
//    });
// }

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}
