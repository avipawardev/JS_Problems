import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import useSocket from '../hooks/useSocket';

const CommentBox = ({ lessonId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const { socket } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/comments', {
        content: comment,
        lesson: lessonId
      });
      socket?.emit('new-comment', { ...response.data, lessonId });
      onCommentAdded(response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded"
        rows="3"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </form>
  );
};

export default CommentBox;