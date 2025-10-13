const socketManager = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-lesson', (lessonId) => {
      socket.join(lessonId);
    });

    socket.on('new-comment', (data) => {
      socket.to(data.lessonId).emit('comment-added', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketManager;