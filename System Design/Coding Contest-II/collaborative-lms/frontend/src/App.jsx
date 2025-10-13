import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import Home from './pages/Home.jsx';
import CourseListingPage from './pages/CourseListingPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CoursePage from './pages/CoursePage.jsx';
import LessonPage from './pages/LessonPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseListingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/instructor" element={<InstructorDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;