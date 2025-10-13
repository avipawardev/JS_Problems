const User = require('../models/User');
const Course = require('../models/Course');

const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    
    const instructorsWithStats = await Promise.all(
      instructors.map(async (instructor) => {
        const courses = await Course.find({ instructor: instructor._id });
        const totalStudents = courses.reduce((acc, course) => acc + (course.students?.length || 0), 0);
        
        return {
          _id: instructor._id,
          name: instructor.name,
          email: instructor.email,
          avatar: instructor.avatar,
          bio: instructor.bio,
          coursesCount: courses.length,
          studentsCount: totalStudents,
          rating: 4.8
        };
      })
    );
    
    res.json(instructorsWithStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInstructorById = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id).select('-password');
    
    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    
    const courses = await Course.find({ instructor: instructor._id }).populate('lessons');
    const totalStudents = courses.reduce((acc, course) => acc + (course.students?.length || 0), 0);
    
    res.json({
      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        avatar: instructor.avatar,
        bio: instructor.bio,
        coursesCount: courses.length,
        studentsCount: totalStudents,
        rating: 4.8
      },
      courses
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, avatar },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getInstructors, getInstructorById, updateProfile };
