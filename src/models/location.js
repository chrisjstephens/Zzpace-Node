var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: String,
  info: String,
  url: String
});

module.exports = mongoose.model('location', locationSchema);
