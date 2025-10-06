const db = require('../config/database');

class Board {
  static create({ name, description, createdBy }) {
    const board = db.createBoard({
      name,
      description,
      createdBy,
      createdAt: new Date()
    });

    // Create default columns
    const defaultColumns = ['Todo', 'In Progress', 'Done'];
    defaultColumns.forEach((columnName, index) => {
      db.createColumn({
        name: columnName,
        boardId: board.id,
        position: index,
        createdAt: new Date()
      });
    });

    return board;
  }

  static findById(id) {
    return db.findBoardById(id);
  }

  static getByUser(userId) {
    return db.getBoardsByUser(userId);
  }

  static addMember(boardId, userId) {
    return db.addMemberToBoard(boardId, userId);
  }

  static removeMember(boardId, userId) {
    return db.removeMemberFromBoard(boardId, userId);
  }

  static delete(id) {
    return db.deleteBoard(id);
  }

  static isMember(boardId, userId) {
    const board = db.findBoardById(boardId);
    return board && board.members.includes(userId);
  }

  static isCreator(boardId, userId) {
    const board = db.findBoardById(boardId);
    return board && board.createdBy === userId;
  }
}

module.exports = Board;