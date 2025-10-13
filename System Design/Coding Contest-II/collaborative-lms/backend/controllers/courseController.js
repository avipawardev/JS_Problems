const Course = require('../models/Course');
const Activity = require('../models/Activity');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    await Activity.create({
      type: 'course_created',
      user: req.user._id,
      course: course._id,
      description: `Created course: ${course.title}`
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const { search, category, level, page = 1, limit = 12 } = req.query;
    const query = { published: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) query.category = category;
    if (level) query.level = level;
    
    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Course.countDocuments(query);
    
    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('lessons')
      .populate('students', 'name email');
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { students: req.user._id } },
      { new: true }
    );
    await Activity.create({
      type: 'course_enroll',
      user: req.user._id,
      course: course._id,
      description: `Enrolled in course: ${course.title}`
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .populate('lessons')
      .populate('students', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCourse, getCourses, getCourse, enrollCourse, updateCourse, deleteCourse, getInstructorCourses };