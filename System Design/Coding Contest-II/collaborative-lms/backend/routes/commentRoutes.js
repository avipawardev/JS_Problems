const express = require('express');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/lesson/:lessonId', getComments);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;