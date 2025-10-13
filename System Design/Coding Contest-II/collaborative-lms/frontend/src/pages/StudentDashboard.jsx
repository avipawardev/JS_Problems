import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import CourseCard from '../components/CourseCard.jsx';
import axiosInstance from '../api/axiosInstance.js';
import useAuth from '../hooks/useAuth.js';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes] = await Promise.all([
        axiosInstance.get('/courses?limit=6')
      ]);
      
      const allCourses = coursesRes.data.courses || coursesRes.data;
      const enrolled = allCourses.filter(c => 
        c.students?.some(s => s._id === user?.id || s === user?.id)
      );
      const recommended = allCourses.filter(c => 
        !c.students?.some(s => s._id === user?.id || s === user?.id)
      );
      
      setEnrolledCourses(enrolled);
      setRecommendedCourses(recommended);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">My Learning</h1>
          
          {/* Enrolled Courses */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Courses</h2>
              <Link to="/" className="text-blue-600 hover:underline">Browse all courses</Link>
            </div>
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                  Explore Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>

          {/* Recommended Courses */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.slice(0, 3).map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="mt-8">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;