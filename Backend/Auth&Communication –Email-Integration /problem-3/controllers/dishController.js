// controllers/dishController.js
const Dish = require('../models/Dish');

exports.createDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json({ status: 'success', data: { dish } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json({ status: 'success', results: dishes.length, data: { dishes } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ status: 'fail', message: 'Dish not found' });
    res.status(200).json({ status: 'success', data: { dish } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dish) return res.status(404).json({ status: 'fail', message: 'Dish not found' });
    res.status(200).json({ status: 'success', data: { dish } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ status: 'fail', message: 'Dish not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
