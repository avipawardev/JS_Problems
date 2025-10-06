const Task = require('../models/Task');
const Board = require('../models/Board');
const Column = require('../models/Column');
const ActivityLog = require('../models/ActivityLog');

const getTasksByColumn = (req, res) => {
  try {
    const columnId = parseInt(req.params.columnId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const column = Column.findById(columnId);
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }
    
    if (!Board.isMember(column.boardId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const result = Task.getByColumn(columnId, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const searchTasks = (req, res) => {
  try {
    const boardId = parseInt(req.params.boardId);
    const { search, assignedTo, dueDate } = req.query;
    
    if (!Board.isMember(boardId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const tasks = Task.getByBoard(boardId, { search, assignedTo, dueDate });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTask = (req, res) => {
  try {
    const { title, description, columnId, assignedTo, dueDate } = req.body;
    
    const column = Column.findById(columnId);
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }
    
    if (!Board.isMember(column.boardId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const task = Task.create({
      title,
      description,
      columnId,
      assignedTo,
      dueDate,
      createdBy: req.user.id
    });
    
    ActivityLog.logTaskCreated(task, req.user.id, column.boardId);
    req.io.to(`board_${column.boardId}`).emit('taskCreated', task);
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!Task.canAccess(taskId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!Task.canEdit(task, req.user.id, req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to edit this task' });
    }

    const updatedTask = Task.update(taskId, req.body);
    const column = Column.findById(updatedTask.columnId);
    
    ActivityLog.logTaskUpdated(updatedTask, req.user.id, column.boardId);
    req.io.to(`board_${column.boardId}`).emit('taskUpdated', updatedTask);
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const moveTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { newColumnId } = req.body;
    
    if (!Task.validateMove(taskId, newColumnId, req.user.id)) {
      return res.status(403).json({ message: 'Invalid move operation' });
    }
    
    const task = Task.findById(taskId);
    const oldColumn = Column.findById(task.columnId);
    const newColumn = Column.findById(newColumnId);
    
    const updatedTask = Task.update(taskId, { columnId: newColumnId });
    
    ActivityLog.logTaskMoved(updatedTask, oldColumn, newColumn, req.user.id, oldColumn.boardId);
    req.io.to(`board_${oldColumn.boardId}`).emit('taskMoved', {
      task: updatedTask,
      oldColumnId: oldColumn.id,
      newColumnId: newColumn.id
    });
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (!Task.canAccess(taskId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const column = Column.findById(task.columnId);
    Task.delete(taskId);
    
    ActivityLog.logTaskDeleted(task, req.user.id, column.boardId);
    req.io.to(`board_${column.boardId}`).emit('taskDeleted', { taskId, columnId: column.id });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getTasksByColumn, searchTasks, createTask, updateTask, moveTask, deleteTask };