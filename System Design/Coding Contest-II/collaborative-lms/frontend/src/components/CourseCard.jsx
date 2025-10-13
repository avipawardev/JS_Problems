import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {course.thumbnail && (
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {course.category}
          </span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">by {course.instructor?.name}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm ml-1">{course.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              ${course.price === 0 ? 'Free' : course.price}
            </p>
          </div>
        </div>
        <Link 
          to={`/course/${course._id}`}
          className="mt-4 block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
