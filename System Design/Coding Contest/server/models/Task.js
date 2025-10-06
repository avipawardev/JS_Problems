const db = require('../config/database');
const Board = require('./Board');
const Column = require('./Column');

class Task {
  static create({ title, description, columnId, assignedTo, dueDate, createdBy }) {
    return db.createTask({
      title,
      description,
      columnId,
      assignedTo,
      dueDate,
      createdBy,
      createdAt: new Date()
    });
  }

  static getByColumn(columnId, page = 1, limit = 10) {
    return db.getTasksByColumn(columnId, page, limit);
  }

  static getByBoard(boardId, filters = {}) {
    return db.getTasksByBoard(boardId, filters);
  }

  static findById(id) {
    return db.findTaskById(id);
  }

  static update(id, updateData) {
    return db.updateTask(id, updateData);
  }

  static delete(id) {
    return db.deleteTask(id);
  }

  static canAccess(taskId, userId) {
    const task = db.findTaskById(taskId);
    if (!task) return false;
    
    const column = Column.findById(task.columnId);
    if (!column) return false;
    
    return Board.isMember(column.boardId, userId);
  }

  static canEdit(task, userId, userRole) {
    return userRole === 'admin' || task.createdBy === userId;
  }

  static validateMove(taskId, newColumnId, userId) {
    const task = db.findTaskById(taskId);
    const oldColumn = Column.findById(task.columnId);
    const newColumn = Column.findById(newColumnId);
    
    if (!task || !oldColumn || !newColumn) return false;
    if (oldColumn.boardId !== newColumn.boardId) return false;
    
    return Board.isMember(oldColumn.boardId, userId);
  }
}

module.exports = Task;