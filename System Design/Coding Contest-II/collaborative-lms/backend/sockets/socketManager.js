const socketManager = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-course', (courseId) => {
      socket.join(`course-${courseId}`);
    });

    socket.on('join-lesson', (lessonId) => {
      socket.join(`lesson-${lessonId}`);
    });

    socket.on('lesson_added', (data) => {
      socket.to(`course-${data.courseId}`).emit('lesson_added', data);
    });

    socket.on('lesson_reordered', (data) => {
      socket.to(`course-${data.courseId}`).emit('lesson_reordered', data);
    });

    socket.on('comment_added', (data) => {
      socket.to(`lesson-${data.lessonId}`).emit('comment_added', data);
    });

    socket.on('comment_deleted', (data) => {
      socket.to(`lesson-${data.lessonId}`).emit('comment_deleted', data);
    });

    socket.on('activity_update', (data) => {
      io.emit('activity_update', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketManager;