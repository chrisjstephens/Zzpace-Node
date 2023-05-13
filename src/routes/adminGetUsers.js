var express = require('express');
var router = express.Router();

var users = require('../models/user.js');

router.get('/api/admin/getUsers', (req, res) => {
  //Get lits of users to display for adminpanel
  users.find({ type: 'customer'}, function (err, results) {
    if (err)  {
      res.json(err);
    } else {
      const newData = results.map(({_id, username, type}) => ({_id, username, type}));

      res.send(newData);
    }
  });

});

module.exports = router;