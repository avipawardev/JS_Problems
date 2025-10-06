const express = require('express');
const { getBoardActivity } = require('../controllers/activityController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/board/:boardId', authenticateToken, getBoardActivity);

module.exports = router;