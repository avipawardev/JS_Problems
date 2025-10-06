const express = require('express');
const { getTasksByColumn, searchTasks, createTask, updateTask, moveTask, deleteTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/auth');
const { validateTask } = require('../middlewares/validation');

const router = express.Router();

router.get('/column/:columnId', authenticateToken, getTasksByColumn);
router.get('/board/:boardId/search', authenticateToken, searchTasks);
router.post('/', authenticateToken, validateTask, createTask);
router.put('/:id', authenticateToken, updateTask);
router.put('/:id/move', authenticateToken, moveTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;