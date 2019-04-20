var express = require('express');
var router = express.Router();

router.get('/api/processHotels', function(req, res, next){
  this.type = req.query.type;
  this.hotelLocation = req.query.hotelLocation;
  this.checkInDate = req.query.checkInDate;
  this.checkOutDate = req.query.checkOutDate;

  this.hotelName = req.query.hotelName;
  this.hotelPrice = req.query.hotelPrice;


  if (checkInDate === 'null' || checkInDate === 'null') {
    res.status(500).send('Please ensure no null values are passed to the date params!');
  }

  if (!hotelLocation || !checkInDate || !checkInDate) {
    res.status(500).send('Please ensure every parameter has a value!');
  }

//check for roomType params

  if (!type) {
    res.status(500).send('Please include a type for your query!');
  }

  if (type === 'listHotels') {
    const hotelResults = processHotelData();
    res.send(hotelResults);
  }

  if (type === 'getRoomType') {
    if (!hotelName || !hotelPrice) {
      res.status(500).send('Please ensure every parameter has a value!');
    }

    const roomTypeResults = getRoomType();
    res.send(roomTypeResults);
  }

});

function processHotelData() {
  let hotelInfo = [{hotelName: 'Hilton', rating: 4.1, price: 85.00},
                   {hotelName: 'Fairmont', rating: 4.8, price: 111.00},
                   {hotelName: 'Best Western', rating: 2.8, price: 45.90},
                   {hotelName: 'Teh Lodge', rating: 2.1, price: 25.00}];

  hotelInfo.map(function (hotelData) {
    hotelData['hotelLocation'] = hotelLocation;
    hotelData['checkInDate'] = checkInDate;
    hotelData['checkOutDate'] = checkOutDate;
  });


  return hotelInfo;
}

function getRoomType() {
  let roomTypes = [{roomType: 'Elite', description: 'Our highest quality room, includes 1 complementary meal per day.', roomTypePrice: 2.25},
                   {roomType: 'Master', description: 'A bed that comes with a free-breakfast and tv with 5 channels!', roomTypePrice: 1.5},
                   {roomType: 'Basic', description: 'A bed and unlimited water-bottles!', roomTypePrice: 1.10},
                   {roomType: 'Budget', description: 'A bed in a 50sqft room!', roomTypePrice: 0.75}];

  roomTypes.map(function (hotelDataObject, index) {
    hotelDataObject['price'] = hotelPrice * roomTypes[index].roomTypePrice;
    hotelDataObject['hotelName'] = hotelName;
    hotelDataObject['hotelLocation'] = hotelLocation;
    hotelDataObject['checkInDate'] = checkInDate;
    hotelDataObject['checkOutDate'] = checkOutDate;
  });

  return roomTypes;
}

module.exports = router;
