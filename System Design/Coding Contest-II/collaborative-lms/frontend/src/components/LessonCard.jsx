import React from 'react';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
      <p className="text-gray-600 mb-4">{lesson.content.substring(0, 100)}...</p>
      <Link 
        to={`/lesson/${lesson._id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Lesson
      </Link>
    </div>
  );
};

export default LessonCard;