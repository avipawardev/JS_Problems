const express = require('express');
const { createLesson, getLessons, getLesson, markComplete, reorderLessons } = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['instructor']), createLesson);
router.get('/course/:courseId', getLessons);
router.get('/:id', getLesson);
router.post('/:id/complete', authMiddleware, markComplete);
router.put('/course/:courseId/reorder', authMiddleware, roleMiddleware(['instructor']), reorderLessons);

module.exports = router;