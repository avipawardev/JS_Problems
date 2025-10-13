const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/lesson/:lessonId', getComments);

module.exports = router;