const db = require('../config/database');

class ActivityLog {
  static create({ action, description, userId, boardId, taskId = null }) {
    return db.createActivityLog({
      action,
      description,
      userId,
      boardId,
      taskId
    });
  }

  static getByBoard(boardId, page = 1, limit = 20) {
    return db.getActivityLogsByBoard(boardId, page, limit);
  }

  static logTaskCreated(task, userId, boardId) {
    return this.create({
      action: 'TASK_CREATED',
      description: `Task "${task.title}" was created`,
      userId,
      boardId,
      taskId: task.id
    });
  }

  static logTaskMoved(task, oldColumn, newColumn, userId, boardId) {
    return this.create({
      action: 'TASK_MOVED',
      description: `Task "${task.title}" moved from "${oldColumn.name}" to "${newColumn.name}"`,
      userId,
      boardId,
      taskId: task.id
    });
  }

  static logTaskUpdated(task, userId, boardId) {
    return this.create({
      action: 'TASK_UPDATED',
      description: `Task "${task.title}" was updated`,
      userId,
      boardId,
      taskId: task.id
    });
  }

  static logTaskDeleted(task, userId, boardId) {
    return this.create({
      action: 'TASK_DELETED',
      description: `Task "${task.title}" was deleted`,
      userId,
      boardId,
      taskId: task.id
    });
  }

  static logUserAdded(username, userId, boardId) {
    return this.create({
      action: 'USER_ADDED',
      description: `User "${username}" was added to the board`,
      userId,
      boardId
    });
  }

  static logUserRemoved(username, userId, boardId) {
    return this.create({
      action: 'USER_REMOVED',
      description: `User "${username}" was removed from the board`,
      userId,
      boardId
    });
  }
}

module.exports = ActivityLog;