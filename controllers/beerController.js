const mongoose = require('mongoose');
const Beer = require('../models/beerModel');

// Get all beers
const getBeers = async (req, res) => {
  const allBeers = await Beer.find({});
  res.status(200).json(allBeers);
};

// Get single beer by ID
const getBeerById = async (req, res) => {
  const { id } = req.params;
  const beerItem = await Beer.findById(id);
  res.status(200).json(beerItem);
};

// Add comment to single beer
const addComment = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  const beer = await Beer.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { comments: comment } },
      { new: true }
        );

  res.status(200).json({ message: "OK", user_id: user_id, beer: beer });
};

module.exports = {
  getBeers,
  getBeerById,
  addComment
};
