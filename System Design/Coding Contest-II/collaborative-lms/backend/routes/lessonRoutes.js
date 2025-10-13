const express = require('express');
const { createLesson, getLessons, getLesson } = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createLesson);
router.get('/course/:courseId', getLessons);
router.get('/:id', getLesson);

module.exports = router;