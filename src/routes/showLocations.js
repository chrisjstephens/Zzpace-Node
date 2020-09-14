var express = require('express');
var router = express.Router();

var location = require('../models/location.js');

//Get a list of locations from mongodb that will be outputted to an API that is used to
//display info on the homepage.

router.get('/api/showLocations', (req, res) => {

  location.find({}, function (err, results) {
    if (err)  {
      res.send(err);
    } else {
      res.send(results);
    }
  });

});

module.exports = router;
