import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CountryDetails from "./components/CountryDetails";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const Nav = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <nav
      className={`mb-4 flex items-center ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Link
        to="/"
        className={`mr-4 px-4 py-2 border rounded ${
          isDark
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
      >
        Home
      </Link>
      <Link
        to="/favorites"
        className={`mr-4 px-4 py-2 border rounded ${
          isDark
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
      >
        Favorites
      </Link>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 border rounded ${
          isDark
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
      >
        {isDark ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
};

const AppContent = () => {
  const { isDark } = useTheme();
  return (
    <Router>
      <div
        className={
          isDark
            ? "min-h-screen bg-gray-900 text-white"
            : "min-h-screen bg-white text-black"
        }
      >
        <h1 className="text-center py-4">Welcome to Global Explorer</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
