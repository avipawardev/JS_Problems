const ActivityLog = require('../models/ActivityLog');
const Board = require('../models/Board');

const getBoardActivity = (req, res) => {
  try {
    const boardId = parseInt(req.params.boardId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    if (!Board.isMember(boardId, req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const result = ActivityLog.getByBoard(boardId, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBoardActivity };