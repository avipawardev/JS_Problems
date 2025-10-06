const db = require('../config/database');

class Column {
  static create({ name, boardId, position }) {
    return db.createColumn({
      name,
      boardId,
      position,
      createdAt: new Date()
    });
  }

  static getByBoard(boardId) {
    return db.getColumnsByBoard(boardId);
  }

  static findById(id) {
    return db.findColumnById(id);
  }
}

module.exports = Column;