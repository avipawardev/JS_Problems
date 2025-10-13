import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import NotificationBell from './NotificationBell.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
            LearnHub
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-medium">
              Courses
            </Link>
            {user && (
              <Link
                to={user.role === 'instructor' ? '/instructor' : '/student'}
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                My Learning
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user && <NotificationBell />}
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-purple-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium">{user.name}</span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium px-4 py-2"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;