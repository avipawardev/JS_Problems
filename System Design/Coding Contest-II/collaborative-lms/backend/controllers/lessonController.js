const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Activity = require('../models/Activity');

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    await Course.findByIdAndUpdate(req.body.course, {
      $push: { lessons: lesson._id }
    });
    await Activity.create({
      type: 'lesson_created',
      user: req.user._id,
      course: req.body.course,
      lesson: lesson._id,
      description: `Created lesson: ${lesson.title}`
    });
    req.app.get('io').to(`course-${req.body.course}`).emit('lesson_added', lesson);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLessons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const lessons = await Lesson.find({ course: req.params.courseId })
      .sort('order')
      .skip(skip)
      .limit(limit);
    
    const total = await Lesson.countDocuments({ course: req.params.courseId });
    
    res.json({
      lessons,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('comments')
      .populate('course', 'title');
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markComplete = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    await Activity.create({
      type: 'lesson_complete',
      user: req.user._id,
      course: lesson.course,
      lesson: lesson._id,
      description: `Completed lesson: ${lesson.title}`
    });
    req.app.get('io').emit('activity_update', {
      type: 'lesson_complete',
      user: req.user.name,
      lesson: lesson.title
    });
    res.json({ message: 'Lesson marked as complete' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reorderLessons = async (req, res) => {
  try {
    const { lessons } = req.body;
    await Promise.all(
      lessons.map((lesson, index) =>
        Lesson.findByIdAndUpdate(lesson.id, { order: index + 1 })
      )
    );
    req.app.get('io').to(`course-${req.params.courseId}`).emit('lesson_reordered', lessons);
    res.json({ message: 'Lessons reordered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createLesson, getLessons, getLesson, markComplete, reorderLessons };