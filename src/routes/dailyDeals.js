var express = require('express');
var router = express.Router();

router.get('/api/dailyDeals', function(req, res, next){
  const dailyDeal = getDailyDeal();

  res.send(dailyDeal);
});

function getDailyDeal() {
  const deals = [
    {
      discount: 0.75,
      title: "With today being the first day of the month, you get a 20% discount!",
      type: "FirstDayOfTheMonth"
    },
    {
      discount: 0.9,
      title: "Hotels 10% off!",
      type: "Hotels"
    },
    {
      discount: 0.85,
      title: "Flights 15% off!",
      type: "Flights"
    },
    {
      discount: 1,
      title: "Sorry, no discounts today!",
      type: "NoDeal"
    }
  ];

  const date = new Date();

  const dayOfTheWeek = date.getDay();
  const dayOfTheMonth = date.getDate();

  if (dayOfTheMonth === 1) {
    //First Day of the month discount
    return deals[0];
  } else if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    //Weekend discount for Hotels
    return deals[1];
  } else if (dayOfTheWeek === 1 || dayOfTheWeek === 5) {
    //Monday, Friday discount for Flights
    return deals[2];
  } else {
    //Tuesday - Thursday no deals
    return deals[3];
  }
}

module.exports = router;
