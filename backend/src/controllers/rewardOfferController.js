const RewardOffer = require('../models/RewardOffer');

exports.createOffer = async (req, res) => {
      console.log("Offer create received:", req.body); // Add this
    const { type, pointsRequired, description } = req.body;
    const offer = await RewardOffer.create({ type, pointsRequired, description });
    res.json(offer);
};

exports.getAllOffers = async (req, res) => {
    const offers = await RewardOffer.find({ isActive: true }).sort({ pointsRequired: 1 });
    res.json(offers);
};

exports.updateOffer = async (req, res) => {
    const offer = await RewardOffer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(offer);
};

exports.deleteOffer = async (req, res) => {
    await RewardOffer.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
};
