import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ProjectDetails, AddProject, Login } from "./Pages";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<PrivateRoute><AddProject /></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
