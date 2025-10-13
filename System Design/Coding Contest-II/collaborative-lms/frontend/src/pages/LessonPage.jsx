import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CommentBox from '../components/CommentBox';
import axiosInstance from '../api/axiosInstance';
import useSocket from '../hooks/useSocket';

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const [lessonRes, commentsRes] = await Promise.all([
          axiosInstance.get(`/lessons/${id}`),
          axiosInstance.get(`/comments/lesson/${id}`)
        ]);
        setLesson(lessonRes.data);
        setComments(commentsRes.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };
    fetchLesson();
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit('join-lesson', id);
      socket.on('comment-added', (newComment) => {
        setComments(prev => [...prev, newComment]);
      });
    }
  }, [socket, id]);

  const handleCommentAdded = (newComment) => {
    setComments(prev => [...prev, newComment]);
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose max-w-none">
            {lesson.content}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b pb-4">
                <p className="font-medium">{comment.author.name}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <CommentBox lessonId={id} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;