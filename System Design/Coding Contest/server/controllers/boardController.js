const Board = require('../models/Board');
const Column = require('../models/Column');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');

const createBoard = (req, res) => {
  try {
    const { name, description } = req.body;
    const board = Board.create({
      name,
      description,
      createdBy: req.user.id
    });
    
    req.io.emit('boardCreated', board);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserBoards = (req, res) => {
  try {
    const boards = Board.getByUser(req.user.id);
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBoardDetails = (req, res) => {
  try {
    const boardId = parseInt(req.params.id);
    const board = Board.findById(boardId);
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    if (!Board.isMember(boardId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const columns = Column.getByBoard(boardId);
    res.json({ ...board, columns });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addMemberToBoard = (req, res) => {
  try {
    const boardId = parseInt(req.params.id);
    const { userId } = req.body;
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add members' });
    }
    
    const board = Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    Board.addMember(boardId, userId);
    ActivityLog.logUserAdded(user.username, req.user.id, boardId);
    
    req.io.to(`board_${boardId}`).emit('memberAdded', { boardId, user });
    res.json({ message: 'Member added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeMemberFromBoard = (req, res) => {
  try {
    const boardId = parseInt(req.params.id);
    const { userId } = req.body;
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can remove members' });
    }
    
    const board = Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    Board.removeMember(boardId, userId);
    ActivityLog.logUserRemoved(user.username, req.user.id, boardId);
    
    req.io.to(`board_${boardId}`).emit('memberRemoved', { boardId, userId });
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteBoard = (req, res) => {
  try {
    const boardId = parseInt(req.params.id);
    const board = Board.findById(boardId);
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    if (!Board.isCreator(boardId, req.user.id)) {
      return res.status(403).json({ message: 'Only board creator can delete the board' });
    }
    
    Board.delete(boardId);
    req.io.emit('boardDeleted', { boardId });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBoard,
  getUserBoards,
  getBoardDetails,
  addMemberToBoard,
  removeMemberFromBoard,
  deleteBoard
};