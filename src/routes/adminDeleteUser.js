var express = require('express');
var router = express.Router();

var users = require('../models/user.js');

router.delete('/api/admin/deleteUser/:username', (req, res, next) => {
  //Delete id
  //Todo deletes all responses
  //users.findOneAndDelete({ username: req.params.username }, function (err) {
  users.findOneAndDelete({ username: req.params.username })
  .exec(function(err, user) {  
    if (err)  {
      res.json(err);
    } else if (!user) {
      res.status(404).send("User " + req.params.username + "not found");
    } else {
      res.send("User " + req.params.username + " has been deleted");
    }
  });

});

module.exports = router;