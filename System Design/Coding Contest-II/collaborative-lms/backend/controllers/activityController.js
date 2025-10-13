const Activity = require('../models/Activity');

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({ ...req.body, user: req.user._id });
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name')
      .populate('course', 'title')
      .sort('-createdAt')
      .limit(20);
    res.json(activities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createActivity, getActivities };