const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');
const Activity = require('../models/Activity');

const createOrder = async (req, res) => {
  try {
    const { courseId, paymentMethod, transactionId, paymentDetails } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existingOrder = await Order.findOne({
      user: req.user._id,
      course: courseId,
      paymentStatus: 'completed'
    });

    if (existingOrder) {
      return res.status(400).json({ message: 'Already purchased this course' });
    }

    const order = await Order.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      paymentMethod,
      transactionId,
      paymentDetails,
      paymentStatus: 'completed'
    });

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { students: req.user._id }
    });

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: courseId }
    });

    await Activity.create({
      type: 'course_enroll',
      user: req.user._id,
      course: courseId,
      description: `Enrolled in course: ${course.title}`
    });

    req.app.get('io').emit('activity_update', {
      type: 'course_enroll',
      user: req.user.name,
      course: course.title
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('course', 'title thumbnail price')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('course')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
