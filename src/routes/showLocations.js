var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var keys = require('../config/keys.js')

var location = require('../models/location.js');

//Get a list of locations from mongodb that will be outputted to an API that is used to
//display info on the homepage.

router.get('/api/showLocations', (req, res) => {
  mongoose.set('debug', true)
  mongoose.connect(keys.mongoDBAddress, {useNewUrlParser: true});

  let db = mongoose.connection;

  db.on('error', err => {
    res.send(err);
    db.close();
  });
  db.once('open', () => {
    //Need for local debugging
  });

  location.find({}, function (err, results) {
    if (err)  {
      res.send(err);
    } else {
      res.send(results);
    }

  });
});

module.exports = router;
