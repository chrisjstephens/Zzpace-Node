let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let passportService = require('./src/services/passport.js');

let requireAuth = passport.authenticate('jwt', { session: false }); //use to access/authenticate serverside routes
let requireSignin = passport.authenticate('local', { session: false });

let keys = require('./src/config/keys.js')
let authenticationRoute = require('./src/routes/authentication.js');
let dailyDealsRoute = require('./src/routes/dailyDeals.js');
let processFlightsRoute = require('./src/routes/processFlights.js');
let processHotelsRoute = require('./src/routes/processHotels.js');
let showLocationsRoute = require('./src/routes/showLocations.js');
let userRoute = require('./src/routes/userInfo.js');

let app = express();

app.use(cors());//allow cors request from browsers to this app/server
app.use(bodyParser.json({ type: '*/*' }));

mongoose.set('debug', true)
mongoose.connect(keys.mongoDBAddress, {useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', err => {
  console.log('err', err);
  res.send(err);
  db.close();
});
db.once('open', () => {
  //Need for local debugging
});

//HOW TO USE REQUIREAUTH
//app.get('/', requireAuth, function(req, res) { res.send({ hi: 'there' }); });

//TODO AUTH FOR CLIENT/USER ROUTES BASED ON USER TYPE
//app.post('/api/signup', authenticationRoute.signup);
app.post('/api/signin', requireSignin, authenticationRoute.signin);

app.get('/api/dailyDeals', dailyDealsRoute);
app.get('/api/processFlights', processFlightsRoute); //change to post?
app.get('/api/processHotels', processHotelsRoute); //change to post?
app.get('/api/showLocations', showLocationsRoute);
app.get('/api/user/:username', userRoute);

app.use(function (req, res, next) {
  res.status(404).send("Sorry this page can't be found!");
})

app.use(function (err, req, res, next) {
  res.status(500).send('Sorry an error has occured! - ' + err.message);
})

app.listen(3000);
