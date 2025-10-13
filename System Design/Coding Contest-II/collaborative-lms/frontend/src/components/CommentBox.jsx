import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import useSocket from '../hooks/useSocket.js';

const CommentBox = ({ lessonId, parentCommentId = null, onCommentAdded, placeholder = "Add a comment..." }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { socket } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/comments', {
        content: comment.trim(),
        lesson: lessonId,
        ...(parentCommentId && { parentComment: parentCommentId })
      });
      socket?.emit('comment_added', { ...response.data, lessonId });
      onCommentAdded(response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="3"
        required
      />
      <div className="flex justify-end mt-2">
        <button 
          type="submit" 
          disabled={!comment.trim() || isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentBox;