const ShopItem = require('../models/ShopItem');
const Order = require('../models/Order');
exports.listItems = async (req, res) => {
  res.json(await ShopItem.find({ available: true }));
};

exports.createOrder = async (req, res) => {
  const { items, address } = req.body;
  const order = await Order.create({ userId: req.user._id, items, address });
  res.json(order);
};


exports.addItem = async (req, res) => {
  const { name, price, category, image, description, available } = req.body;
  const item = await ShopItem.create({ name, price, category, image, description, available });
  res.json(item);
};
exports.deleteItem = async (req, res) => {
  await ShopItem.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
