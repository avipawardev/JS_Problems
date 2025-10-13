import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200">LearnHub</Link>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to={user.role === 'instructor' ? '/instructor' : '/student'} className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/profile" className="hover:text-blue-200">
                Profile
              </Link>
              <span className="text-sm">Welcome, {user.name}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;