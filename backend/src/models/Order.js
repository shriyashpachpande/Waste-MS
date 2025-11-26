const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem' }, qty: Number }],
  address: String,
  status: { type: String, enum: ['PLACED','SHIPPED','DELIVERED','CANCELLED'], default: 'PLACED' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
