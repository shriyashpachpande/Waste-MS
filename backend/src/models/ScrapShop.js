const mongoose = require('mongoose');
const scrapShopSchema = new mongoose.Schema({
  name: String,
  coords: { lat: Number, lon: Number },
  contact: String
});
module.exports = mongoose.model('ScrapShop', scrapShopSchema);
