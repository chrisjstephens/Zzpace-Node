var express = require('express');
var router = express.Router();

var users = require('../models/user.js');

router.put('/api/admin/updateUser/:username', (req, res, next) => {
  //Update id
  //Todo: anyone with a valid token can update, make it so that only customer1 can update customer1, admin update admin, etc
  users.findOneAndUpdate({ 'username': req.params.username }, { $set: req.body }, { runValidators: true, context: 'query' }, function (err) {
    if (!err)  {
        res.json('User has been updated');
    } else {
        res.status(400).json(err);
    }
  });

});

module.exports = router;