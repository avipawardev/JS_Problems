import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import LessonCard from '../components/LessonCard.jsx';
import axiosInstance from '../api/axiosInstance.js';
import useSocket from '../hooks/useSocket.js';
import usePagination from '../hooks/usePagination.js';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessonsData, setLessonsData] = useState({ lessons: [], totalPages: 0, currentPage: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const { socket, joinCourse } = useSocket();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRes = await axiosInstance.get(`/courses/${id}`);
        setCourse(courseRes.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

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

  if (!course) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>
        
        <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
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