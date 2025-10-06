const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  const jwt = require('jsonwebtoken');
  const { JWT_SECRET } = require('../config/config');
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.userId = decoded.id;
    socket.userRole = decoded.role;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};

const handleConnection = (io) => {
  return (socket) => {
    console.log(`User ${socket.userId} connected`);
    
    socket.on('joinBoard', (boardId) => {
      const Board = require('../models/Board');
      if (Board.isMember(boardId, socket.userId)) {
        socket.join(`board_${boardId}`);
        console.log(`User ${socket.userId} joined board ${boardId}`);
      }
    });
    
    socket.on('leaveBoard', (boardId) => {
      socket.leave(`board_${boardId}`);
      console.log(`User ${socket.userId} left board ${boardId}`);
    });
    
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  };
};

module.exports = { socketAuth, handleConnection };