var express = require('express');
var router = express.Router();

// TODO: Change to post perhaps if get/post changes server state
router.get('/api/processFlights', function(req, res, next){
  //INVALID-http://localhost:3000/api/processFlights?toLocation=Mars&fromLocation=Earth&departureDate=11-11-11&returnDate=11-11-11&ticketsAmt=5
  //VALID-http://localhost:3000/api/processFlights?type=return&toLocation=Mars&fromLocation=Earth&departureDate=11-11-11&returnDate=11-11-11&ticketsAmt=5
  //AWS IP-18.222.76.93:3000

  this.type = req.query.type;
  this.toLocation = req.query.toLocation;
  this.fromLocation = req.query.fromLocation;
  this.departureDate = req.query.departureDate;
  this.returnDate = req.query.returnDate;
  this.ticketsAmt = req.query.ticketsAmt;

  if (departureDate === 'null' || returnDate === 'null') {
    res.status(500).send('Please ensure no null values are passed to the date params!');
  }

  if (!toLocation || !fromLocation || !departureDate || !returnDate || !ticketsAmt) {
    res.status(500).send('Please ensure every parameter has a value!');
  }

  if (!type) {
    res.status(500).send('Please include a type for your query!');
  }

  this.minDate = new Date().toISOString().slice(0,10);
  this.minReturnDate = new Date();
  this.minReturnDate.setDate(this.minReturnDate.getDate() + 1);
  this.minReturnDate = this.minReturnDate.toISOString().slice(0,10);
  this.flightLength = Math.floor(Math.random() * 41) + 40;

  if (type === 'departure') {
    let departureFlightResults = getDepartureFlightStatus();
    res.send(departureFlightResults);
  }

  if (type === 'return') {
    let returnFlightResults = getReturnFlightStatus();
    res.send(returnFlightResults);
  }

});

function getDepartureFlightStatus() {
  const departureTimes = [6, 10, 14, 18, 22];

  const flightLength = this.flightLength;

  const departureDate = this.departureDate;

  const fromLocation = this.fromLocation;
  const toLocation = this.toLocation;

  const ticketsAmt = this.ticketsAmt;

  const flightTime6 = departureTimes[0];
  const departureTime6 = getDepartureTime(departureDate, flightTime6);

  const flightTime10 = departureTimes[1];
  const departureTime10 = getDepartureTime(departureDate, flightTime10);

  const flightTime14 = departureTimes[2];
  const departureTime14 = getDepartureTime(departureDate, flightTime14);

  const flightTime18 = departureTimes[3];
  const departureTime18 = getDepartureTime(departureDate, flightTime18);

  const flightTime22 = departureTimes[4];
  const departureTime22 = getDepartureTime(departureDate, flightTime22);

  const flightObj = [
    createFlightObj(getFlightId(fromLocation, 1, toLocation, departureDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime6, flightTime6, flightLength),
      getDepartureTime(departureDate, flightTime6),
      flightLength,
      calculateFlightPrice(getDepartureTime(departureDate , flightTime6)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 2, toLocation, departureDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime10, flightTime10, flightLength),
      getDepartureTime(departureDate, flightTime10),
      flightLength,
      calculateFlightPrice(getDepartureTime(departureDate , flightTime10)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 3, toLocation, departureDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime14, flightTime14, flightLength),
      getDepartureTime(departureDate, flightTime14),
      flightLength,
      calculateFlightPrice(getDepartureTime(departureDate, flightTime14)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 4, toLocation, departureDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime18, flightTime18, flightLength),
      getDepartureTime(departureDate, flightTime18),
      flightLength,
      calculateFlightPrice(getDepartureTime(departureDate, flightTime18)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 5, toLocation, departureDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime22, flightTime22, flightLength),
      getDepartureTime(departureDate, flightTime22),
      flightLength,
      calculateFlightPrice(getDepartureTime(departureDate, flightTime22)),
      ticketsAmt
    ) ];

  return flightObj;
}

function getReturnFlightStatus() {
  const returnTimes = [7, 11, 15, 19, 23];

  const flightLength = this.flightLength;

  const returnDate = this.returnDate;

  const fromLocation = this.toLocation;
  const toLocation = this.fromLocation;

  const ticketsAmt = this.ticketsAmt;

  const flightTime7 = returnTimes[0];
  const departureTime7 = getDepartureTime(returnDate, flightTime7);

  const flightTime11 = returnTimes[1];
  const departureTime11 = getDepartureTime(returnDate, flightTime11);

  const flightTime15 = returnTimes[2];
  const departureTime15 = getDepartureTime(returnDate, flightTime15);

  const flightTime19 = returnTimes[3];
  const departureTime19 = getDepartureTime(returnDate, flightTime19);

  const flightTime23 = returnTimes[4];
  const departureTime23 = getDepartureTime(returnDate, flightTime23);

  const flightObj = [
    createFlightObj(getFlightId(fromLocation, 1, toLocation, returnDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime7, flightTime7, flightLength),
      getDepartureTime(returnDate, flightTime7),
      flightLength,
      calculateFlightPrice(getDepartureTime(returnDate, flightTime7)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 2, toLocation, returnDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime11, flightTime11, flightLength),
      getDepartureTime(returnDate , flightTime11),
      flightLength,
      calculateFlightPrice(getDepartureTime(returnDate , flightTime11)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 3, toLocation, returnDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime15, flightTime15, flightLength),
      getDepartureTime(returnDate, flightTime15),
      flightLength,
      calculateFlightPrice(getDepartureTime(returnDate, flightTime15)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 4, toLocation, returnDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime19, flightTime19, flightLength),
      getDepartureTime(returnDate, flightTime19),
      flightLength,
      calculateFlightPrice(getDepartureTime(returnDate, flightTime19)),
      ticketsAmt
    ),
    createFlightObj(getFlightId(fromLocation, 5, toLocation, returnDate),
      toLocation,
      fromLocation,
      getArrivalTime(departureTime23, flightTime23, flightLength),
      getDepartureTime(returnDate, flightTime23),
      flightLength,
      calculateFlightPrice(getDepartureTime(returnDate, flightTime23)),
      ticketsAmt
    ) ];

  return flightObj;
}

function createFlightObj(flightId, toLocation, fromLocation, arrivalTime,
  departureTime, flightTimeLength, flightPrice, ticketsAmt) {
  const flightObj = {
   'flightId' : flightId,
   'arrivalLocation' : toLocation,
   'departureLocation' : fromLocation,
   'arrivalTime' : arrivalTime,
   'departureTime' : departureTime,
   'flightTimeLength' : flightTimeLength,
   'flightPrice' : flightPrice,
   'ticketsAmt' : ticketsAmt
   };
  return flightObj;
}

function getDepartureTime(date, hours) {
  let dateOut = new Date(date);
  dateOut.setHours(hours, 0, 0);
  return dateOut;
}

function getArrivalTime(departureDate, departHour, flightLength) {
  if (!departureDate) { return; }

  const date = departureDate;
  date.setHours(date.getHours() + flightLength);
  return date;
}

function getFlightId(fromLocation, flightNumber, toLocation, departureDate) {
  let departureDateNew = new Date(departureDate);
  const flightId = fromLocation.substring(0, 2).toUpperCase() + '-' + flightNumber + '-' + toLocation.substring(0, 2).toUpperCase()
  + '-' + departureDateNew.getMonth() +1 + departureDateNew.getDate() + departureDateNew.getFullYear().toString().substring(2, 4);

  return flightId;
}

function calculateFlightPrice(departureDate) {
  let price = 100;

  // Calculate price based on departure day of week
  if ( departureDate.getDay() <= 2 ) {
    price = price * 1.1;
  } else if ( departureDate.getDay() >= 3 && departureDate.getDay() >= 5 ) {
    price = price * 1.5;
  } else {
    price = price * 1.25;
  }

  // Calculate price based on departure arrivalTimes
  if ( departureDate.getHours() <= 8  ) {
    price = price * 0.8;
  } else if ( departureDate.getHours() <= 9 && departureDate.getHours() <= 14 ) {
    price = price * 1.4;
  } else if ( departureDate.getHours() <= 15 && departureDate.getHours() <= 23 ) {
    price = price * 1.15;
  }

  // round price to 2 decimals
  price = +price.toFixed(2);

  return price;
}

module.exports = router;
