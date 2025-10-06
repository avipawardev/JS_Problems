// In-memory storage (replace with database in production)
class Database {
  constructor() {
    this.users = [];
    this.boards = [];
    this.columns = [];
    this.tasks = [];
    this.activityLogs = [];
    this.userIdCounter = 1;
    this.boardIdCounter = 1;
    this.columnIdCounter = 1;
    this.taskIdCounter = 1;
    this.logIdCounter = 1;
  }

  // User methods
  createUser(userData) {
    const user = { ...userData, id: this.userIdCounter++ };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  getAllUsers() {
    return this.users;
  }

  // Board methods
  createBoard(boardData) {
    const board = { ...boardData, id: this.boardIdCounter++, members: [boardData.createdBy] };
    this.boards.push(board);
    return board;
  }

  findBoardById(id) {
    return this.boards.find(b => b.id === id);
  }

  getBoardsByUser(userId) {
    return this.boards.filter(b => b.members.includes(userId));
  }

  addMemberToBoard(boardId, userId) {
    const board = this.findBoardById(boardId);
    if (board && !board.members.includes(userId)) {
      board.members.push(userId);
    }
    return board;
  }

  removeMemberFromBoard(boardId, userId) {
    const board = this.findBoardById(boardId);
    if (board) {
      board.members = board.members.filter(id => id !== userId);
    }
    return board;
  }

  deleteBoard(id) {
    const index = this.boards.findIndex(b => b.id === id);
    if (index !== -1) {
      return this.boards.splice(index, 1)[0];
    }
    return null;
  }

  // Column methods
  createColumn(columnData) {
    const column = { ...columnData, id: this.columnIdCounter++ };
    this.columns.push(column);
    return column;
  }

  getColumnsByBoard(boardId) {
    return this.columns.filter(c => c.boardId === boardId);
  }

  findColumnById(id) {
    return this.columns.find(c => c.id === id);
  }

  // Task methods
  createTask(taskData) {
    const task = { ...taskData, id: this.taskIdCounter++ };
    this.tasks.push(task);
    return task;
  }

  getTasksByColumn(columnId, page = 1, limit = 10) {
    const tasks = this.tasks.filter(t => t.columnId === columnId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      tasks: tasks.slice(startIndex, endIndex),
      total: tasks.length,
      page,
      totalPages: Math.ceil(tasks.length / limit)
    };
  }

  getTasksByBoard(boardId, filters = {}) {
    let tasks = this.tasks.filter(t => {
      const column = this.findColumnById(t.columnId);
      return column && column.boardId === boardId;
    });

    if (filters.search) {
      tasks = tasks.filter(t => t.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.assignedTo) {
      tasks = tasks.filter(t => t.assignedTo === parseInt(filters.assignedTo));
    }
    if (filters.dueDate) {
      tasks = tasks.filter(t => t.dueDate === filters.dueDate);
    }

    return tasks;
  }

  findTaskById(id) {
    return this.tasks.find(t => t.id === id);
  }

  updateTask(id, updateData) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updateData };
      return this.tasks[index];
    }
    return null;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }

  // Activity Log methods
  createActivityLog(logData) {
    const log = { ...logData, id: this.logIdCounter++, timestamp: new Date() };
    this.activityLogs.push(log);
    return log;
  }

  getActivityLogsByBoard(boardId, page = 1, limit = 20) {
    const logs = this.activityLogs.filter(l => l.boardId === boardId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      logs: logs.slice(startIndex, endIndex),
      total: logs.length,
      page,
      totalPages: Math.ceil(logs.length / limit)
    };
  }
}

module.exports = new Database();