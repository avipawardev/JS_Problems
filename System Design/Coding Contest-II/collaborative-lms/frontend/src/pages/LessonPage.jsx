import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import CommentBox from '../components/CommentBox.jsx';
import LessonPlayer from '../components/LessonPlayer.jsx';
import axiosInstance from '../api/axiosInstance.js';
import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const { socket, joinLesson } = useSocket();
  const { user } = useAuth();

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
    if (socket && id) {
      joinLesson(id);
      
      const handleCommentAdded = (newComment) => {
        setComments(prev => [...prev, newComment]);
      };
      
      const handleCommentDeleted = ({ commentId }) => {
        setComments(prev => prev.filter(c => c._id !== commentId));
      };
      
      socket.on('comment_added', handleCommentAdded);
      socket.on('comment_deleted', handleCommentDeleted);
      
      return () => {
        socket.off('comment_added', handleCommentAdded);
        socket.off('comment_deleted', handleCommentDeleted);
      };
    }
  }, [socket, id, joinLesson]);

  const handleCommentAdded = (newComment) => {
    setComments(prev => [...prev, newComment]);
  };

  const markComplete = async () => {
    try {
      await axiosInstance.post(`/lessons/${id}/complete`);
      alert('Lesson marked as complete!');
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!lesson) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LessonPlayer lesson={lesson} />
            
            {user?.role === 'student' && (
              <button
                onClick={markComplete}
                className="w-full mt-4 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600"
              >
                ✓ Mark as Complete
              </button>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Course: {lesson.course?.title}</h3>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Lesson {lesson.order}</p>
                {lesson.duration && (
                  <p>Duration: {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{comment.author.name}</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {comment.author._id === user?.id && (
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="bg-gray-50 p-2 rounded">
                        <p className="font-medium text-sm">{reply.author.name}</p>
                        <p className="text-gray-700 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
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