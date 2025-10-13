import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('activity_update', (activity) => {
      setActivities(prev => [activity, ...prev.slice(0, 19)]);
    });

    return () => newSocket.close();
  }, []);

  const joinCourse = (courseId) => {
    if (socket) socket.emit('join-course', courseId);
  };

  const joinLesson = (lessonId) => {
    if (socket) socket.emit('join-lesson', lessonId);
  };

  return (
    <SocketContext.Provider value={{ socket, activities, joinCourse, joinLesson }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;