import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import LessonCard from '../components/LessonCard.jsx';
import axiosInstance from '../api/axiosInstance.js';
import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessonsData, setLessonsData] = useState({ lessons: [], totalPages: 0, currentPage: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { socket, joinCourse } = useSocket();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRes = await axiosInstance.get(`/courses/${id}`);
        setCourse(courseRes.data);
        if (user) {
          setIsEnrolled(courseRes.data.students?.some(s => s._id === user.id || s === user.id));
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id, user]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsRes = await axiosInstance.get(`/lessons/course/${id}?page=${currentPage}&limit=6`);
        setLessonsData(lessonsRes.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, [id, currentPage]);

  useEffect(() => {
    if (socket && id) {
      joinCourse(id);
      
      const handleLessonAdded = (newLesson) => {
        setLessonsData(prev => ({
          ...prev,
          lessons: [...prev.lessons, newLesson]
        }));
      };
      
      const handleLessonReordered = (reorderedLessons) => {
        setLessonsData(prev => ({
          ...prev,
          lessons: reorderedLessons
        }));
      };
      
      socket.on('lesson_added', handleLessonAdded);
      socket.on('lesson_reordered', handleLessonReordered);
      
      return () => {
        socket.off('lesson_added', handleLessonAdded);
        socket.off('lesson_reordered', handleLessonReordered);
      };
    }
  }, [socket, id, joinCourse]);

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (course.price === 0) {
      enrollFree();
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  const enrollFree = async () => {
    try {
      await axiosInstance.post(`/courses/${id}/enroll`);
      setIsEnrolled(true);
      alert('Successfully enrolled!');
    } catch (error) {
      alert(error.response?.data?.message || 'Enrollment failed');
    }
  };

  if (!course) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{course.category}</span>
              <span className="text-gray-600">{course.level}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{course.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {course.thumbnail && (
                <img src={course.thumbnail} alt={course.title} className="w-full rounded mb-4" />
              )}
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </p>
              {isEnrolled ? (
                <button className="w-full bg-green-500 text-white py-3 rounded-lg" disabled>
                  Enrolled
                </button>
              ) : (
                <button 
                  onClick={handleEnroll}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                  {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
                </button>
              )}
              <div className="mt-4 text-sm text-gray-600">
                <p>• {course.lessons?.length || 0} lessons</p>
                <p>• {course.students?.length || 0} students enrolled</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 mt-8">Course Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {lessonsData.lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
        
        {lessonsData.totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {lessonsData.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, lessonsData.totalPages))}
              disabled={currentPage === lessonsData.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;