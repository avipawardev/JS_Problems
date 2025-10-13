import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/instructor" element={<InstructorDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;