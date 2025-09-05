const express = require('express');
const { getAllTodos, createTodo, searchTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/search', searchTodos);
router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;