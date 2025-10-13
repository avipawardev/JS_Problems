import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import CourseCard from '../components/CourseCard.jsx';
import axiosInstance from '../api/axiosInstance.js';

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [featuredInstructors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', expertise: 'AI & Machine Learning', image: 'https://i.pravatar.cc/150?img=1', courses: 12 },
    { id: 2, name: 'Prof. Michael Chen', expertise: 'Web Development', image: 'https://i.pravatar.cc/150?img=2', courses: 18 },
    { id: 3, name: 'Emily Rodriguez', expertise: 'Data Science', image: 'https://i.pravatar.cc/150?img=3', courses: 15 },
    { id: 4, name: 'David Kumar', expertise: 'Business Strategy', image: 'https://i.pravatar.cc/150?img=4', courses: 10 }
  ]);

  const categories = [
    { name: 'Technology', icon: '💻', courses: 245 },
    { name: 'AI & Machine Learning', icon: '🤖', courses: 189 },
    { name: 'Design', icon: '🎨', courses: 156 },
    { name: 'Business', icon: '💼', courses: 203 },
    { name: 'Marketing', icon: '📈', courses: 178 },
    { name: '1st-10th Class', icon: '📚', courses: 312 }
  ];
  const levels = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    fetchCourses();
  }, [search, category, level, currentPage]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (level) params.append('level', level);
      params.append('page', currentPage);

      const response = await axiosInstance.get(`/courses?${params.toString()}`);
      setCourses(response.data.courses || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">What do you want to learn today?</h1>
            <p className="text-xl mb-8 text-purple-100">Skills for your present and your future. Get started with us.</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setCurrentPage(1)}
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
              <button className="absolute right-2 top-2 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => { setCategory(cat.name); setCurrentPage(1); }}
              className="bg-gray-50 hover:bg-purple-50 p-6 rounded-lg cursor-pointer transition border border-gray-200 hover:border-purple-300"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.courses} courses</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Instructors */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-200"
                />
                <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{instructor.expertise}</p>
                <p className="text-xs text-purple-600 font-semibold">{instructor.courses} Courses</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Courses</h2>
          <Link to="/" className="text-purple-600 hover:underline font-semibold">View All →</Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <span className="font-semibold text-gray-700">Filter by:</span>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => { setLevel(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Levels</option>
            {levels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
            ))}
          </select>

          {(category || level || search) && (
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setLevel('');
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
