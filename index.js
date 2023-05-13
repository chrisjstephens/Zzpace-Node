let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let passportService = require('./src/services/passport.js');

let requireAuth = passport.authenticate('jwt', { session: false });
let requireSignin = passport.authenticate('local', { session: false });

let keys = require('./src/config/keys.js');
let adminGetUsersRoute = require('./src/routes/adminGetUsers.js');
let adminDeleteUserRoute = require('./src/routes/adminDeleteUser.js');
let adminUpdateUserRoute = require('./src/routes/adminUpdateUser.js');
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
  res.send(err);
  db.close();
});
db.once('open', () => {
  //Need for local debugging
});

//HOW TO USE REQUIREAUTH
//app.get('/api/test', requireAuth, function(req, res) { res.send({ hi: 'there' }); });

//TODO AUTH FOR CLIENT/USER ROUTES BASED ON USER TYPE
app.post('/api/addUser', authenticationRoute.signup);
app.post('/api/signin', requireSignin, authenticationRoute.signin);

app.get('/api/admin/getUsers', requireAuth, adminGetUsersRoute);
app.delete('/api/admin/deleteUser/:username', requireAuth, adminDeleteUserRoute);
app.put('/api/admin/updateUser/:username', requireAuth, adminUpdateUserRoute); //make sure token matches for that user
app.get('/api/admin/user/:username', requireAuth, userRoute);

app.get('/api/dailyDeals', dailyDealsRoute);
app.get('/api/processFlights', processFlightsRoute); //change to post?
app.get('/api/processHotels', processHotelsRoute); //change to post?
app.get('/api/showLocations', showLocationsRoute);


app.use(function (req, res, next) {
  res.status(404).send("Sorry this page can't be found!");
})

app.use(function (err, req, res, next) {
  res.status(500).json('Sorry an error has occured! - ' + err.message);
})

app.listen(3000);
