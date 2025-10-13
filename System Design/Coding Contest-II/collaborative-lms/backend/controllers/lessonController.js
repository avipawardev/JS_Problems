const Lesson = require('../models/Lesson');

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.json(lessons);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('comments');
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createLesson, getLessons, getLesson };