const mongoose = require('mongoose');
const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  available: { type: Boolean, default: true },
  image: String,
  description: String,         // <-- Add this line
  pointsRequired: Number       // <-- For wallet redeem support (optional)
});
module.exports = mongoose.model('ShopItem', shopItemSchema);
