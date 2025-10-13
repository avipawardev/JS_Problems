import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      login(response.data.token, response.data.user);
      navigate(response.data.user.role === 'instructor' ? '/instructor' : '/student');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;