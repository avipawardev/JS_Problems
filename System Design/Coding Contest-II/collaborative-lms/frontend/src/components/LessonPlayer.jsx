import React from 'react';

const LessonPlayer = ({ lesson }) => {
  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {lesson.videoUrl ? (
        <video 
          controls 
          className="w-full"
          src={lesson.videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-96 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            <p className="text-xl">No video available</p>
          </div>
        </div>
      )}
      <div className="bg-white p-4">
        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
        {lesson.duration && (
          <p className="text-sm text-gray-600 mb-2">
            Duration: {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
          </p>
        )}
        <p className="text-gray-700">{lesson.content}</p>
      </div>
    </div>
  );
};

export default LessonPlayer;
