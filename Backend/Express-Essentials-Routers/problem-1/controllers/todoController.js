const { readTodos, writeTodos } = require('../models/todoModel');

const getAllTodos = (req, res) => {
  const todos = readTodos();
  res.json(todos);
};

const createTodo = (req, res) => {
  const { title, completed = false } = req.body;
  const todos = readTodos();
  const newTodo = { id: Date.now(), title, completed };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const searchTodos = (req, res) => {
  const { q } = req.query;
  const todos = readTodos();
  const filtered = todos.filter(todo => 
    todo.title.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filtered);
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json(todos[index]);
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  writeTodos(todos);
  res.status(204).send();
};

module.exports = { getAllTodos, createTodo, searchTodos, updateTodo, deleteTodo };


