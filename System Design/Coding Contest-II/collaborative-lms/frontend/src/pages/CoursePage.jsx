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
  const [activeTab, setActiveTab] = useState('overview');
  const [reviews] = useState([
    { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent course! Very detailed and easy to follow.', date: '2024-01-15' },
    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great content, but could use more examples.', date: '2024-01-10' }
  ]);
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
        {/* Course Header */}
        <div className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-300 mb-4 text-lg">{course.description}</p>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="ml-2 font-bold">{course.rating.toFixed(1)}</span>
                    <span className="ml-2 text-gray-400">({course.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-400">{course.students?.length || 0} students</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-purple-600 px-3 py-1 rounded">{course.category}</span>
                  <span className="text-gray-300 capitalize">{course.level}</span>
                </div>
                <div className="mt-4 flex items-center">
                  <img src="https://i.pravatar.cc/40" alt="instructor" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Created by</p>
                    <p className="font-semibold">{course.instructor?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="border-b">
                  <div className="flex space-x-8 px-6">
                    {['overview', 'lessons', 'reviews', 'qa'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 font-semibold capitalize transition ${
                          activeTab === tab
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-600 hover:text-purple-600'
                        }`}
                      >
                        {tab === 'qa' ? 'Q&A' : tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">About this course</h3>
                      <p className="text-gray-700 mb-6">{course.description}</p>
                      <h4 className="font-bold text-lg mb-3">What you'll learn</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        <li className="flex items-start">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span>Master the fundamentals</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span>Build real-world projects</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span>Industry best practices</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span>Career advancement skills</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'lessons' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Course Content</h3>
                      <p className="text-gray-600 mb-6">{lessonsData.lessons.length} lessons</p>
                      <div className="space-y-3">
                        {lessonsData.lessons.map((lesson, idx) => (
                          <div key={lesson._id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-purple-600 mr-3">▶</span>
                                <div>
                                  <h4 className="font-semibold">{lesson.title}</h4>
                                  {lesson.duration && (
                                    <p className="text-sm text-gray-500">{Math.floor(lesson.duration / 60)} min</p>
                                  )}
                                </div>
                              </div>
                              {isEnrolled && (
                                <button
                                  onClick={() => navigate(`/lesson/${lesson._id}`)}
                                  className="text-purple-600 hover:underline"
                                >
                                  Start
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Student Reviews</h3>
                      <div className="space-y-4">
                        {reviews.map(review => (
                          <div key={review.id} className="border-b pb-4">
                            <div className="flex items-center mb-2">
                              <img src="https://i.pravatar.cc/40" alt={review.user} className="w-10 h-10 rounded-full mr-3" />
                              <div>
                                <p className="font-semibold">{review.user}</p>
                                <div className="flex items-center">
                                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                                  <span className="text-gray-400 text-sm ml-2">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'qa' && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Questions & Answers</h3>
                      <div className="mb-6">
                        <textarea
                          placeholder="Ask a question..."
                          className="w-full p-3 border rounded-lg"
                          rows="3"
                        />
                        <button className="mt-2 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                          Post Question
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          <p className="font-semibold mb-2">How long do I have access to the course?</p>
                          <p className="text-gray-600 text-sm mb-2">Asked by Student123</p>
                          <p className="text-gray-700">You have lifetime access to all enrolled courses.</p>
                        </div>
                      </div>
                    </div>
                  )}
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
      </div>
        
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
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
    </div>
  );
};

export default CoursePage;