const express = require('express');
const { createCourse, getCourses, enrollCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['instructor']), createCourse);
router.get('/', getCourses);
router.post('/:id/enroll', authMiddleware, enrollCourse);

module.exports = router;