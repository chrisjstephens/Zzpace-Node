let express = require('express');
let cors = require('cors')
let dailyDealsRoute = require('./src/routes/dailyDeals.js');
let processFlightsRoute = require('./src/routes/processFlights.js');
let processHotelsRoute = require('./src/routes/processHotels.js');
let showLocationsRoute = require('./src/routes/showLocations.js');

let app = express();

app.use(cors());

app.get('/api/dailyDeals', dailyDealsRoute);
app.get('/api/processFlights', processFlightsRoute);
app.get('/api/processHotels', processHotelsRoute);
app.get('/api/showLocations', showLocationsRoute);

app.use(function (req, res, next) {
  res.status(404).send("Sorry this page can't be found!");
})

app.use(function (err, req, res, next) {
  res.status(500).send('Sorry an error has occured! - ' + err.message);
})

app.listen(3000);
