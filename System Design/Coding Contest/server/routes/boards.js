const express = require('express');
const { createBoard, getUserBoards, getBoardDetails, addMemberToBoard, removeMemberFromBoard, deleteBoard } = require('../controllers/boardController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');
const { validateBoard } = require('../middlewares/validation');

const router = express.Router();

router.get('/', authenticateToken, getUserBoards);
router.get('/:id', authenticateToken, getBoardDetails);
router.post('/', authenticateToken, validateBoard, createBoard);
router.post('/:id/members', authenticateToken, requireAdmin, addMemberToBoard);
router.delete('/:id/members', authenticateToken, requireAdmin, removeMemberFromBoard);
router.delete('/:id', authenticateToken, deleteBoard);

module.exports = router;