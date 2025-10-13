const express = require('express');
const { createCourse, getCourses, getCourse, enrollCourse, updateCourse, deleteCourse, getInstructorCourses } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['instructor']), createCourse);
router.get('/', getCourses);
router.get('/instructor/my-courses', authMiddleware, roleMiddleware(['instructor']), getInstructorCourses);
router.get('/:id', getCourse);
router.put('/:id', authMiddleware, roleMiddleware(['instructor']), updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware(['instructor']), deleteCourse);
router.post('/:id/enroll', authMiddleware, enrollCourse);

module.exports = router;