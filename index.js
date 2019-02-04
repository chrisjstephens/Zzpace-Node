let express = require('express');
let cors = require('cors')
let processFlightsRoute = require('./src/routes/processFlights.js');

let app = express();

app.use(cors());

app.get('/api/processFlights', processFlightsRoute);

app.use(function (req, res, next) {
  res.status(404).send("Sorry this page can't be found!");
})

app.use(function (err, req, res, next) {
  res.status(500).send('Sorry an error has occured! - ' + err.message);
})

app.listen(3000);
//TODO:update for host domain
