var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.get('/api/admin/user/:username', (req, res) => {
  //authenticate
  //get data for user signedin
  //get user info
  let username = req.params.username;

  User.findOne({ username: username }, function(err, result) {
    if (err) { return next(err); }

    if (result) {
      let newData = result.toObject();

      delete newData.password;
      delete newData.__v;
      res.send(newData);
    } else {
      res.status(404).send('Username does not exist!');
    }
   });

});


module.exports = router;
