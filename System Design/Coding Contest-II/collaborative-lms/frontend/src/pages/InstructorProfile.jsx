import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import axiosInstance from '../api/axiosInstance.js';

const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchInstructorData();
  }, [id]);

  const fetchInstructorData = async () => {
    try {
      const response = await axiosInstance.get(`/users/instructors/${id}`);
      setInstructor(response.data.instructor);
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching instructor data:', error);
    }
  };

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6">
            <img
              src={instructor.avatar || `https://i.pravatar.cc/150?u=${instructor._id}`}
              alt={instructor.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">{instructor.name}</h1>
              <p className="text-xl text-purple-100 mb-2">{instructor.bio || 'Professional Instructor'}</p>
              <div className="flex items-center space-x-4 text-purple-100">
                <span>📚 {instructor.coursesCount} Courses</span>
                <span>⭐ {instructor.rating} Rating</span>
                <span>👥 {instructor.studentsCount} Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Courses by {instructor.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
