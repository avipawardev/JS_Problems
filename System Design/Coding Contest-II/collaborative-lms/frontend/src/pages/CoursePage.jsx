import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LessonCard from '../components/LessonCard';
import axiosInstance from '../api/axiosInstance';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          axiosInstance.get(`/courses/${id}`),
          axiosInstance.get(`/lessons/course/${id}`)
        ]);
        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>
        
        <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;