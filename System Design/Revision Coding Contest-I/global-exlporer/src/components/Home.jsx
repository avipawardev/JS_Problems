import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { favorites, addFavorite } = useFavorites();
  const { isDark } = useTheme();

  const fetchCountries = async () => {
    try {
      let res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca3"
      );
      setCountries(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country?.name?.common?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country?.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / itemsPerPage)
  );

  const currentCountries = (() => {
    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    return filteredCountries.slice(first, last);
  })();

  const gotoPage = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
  };

  const toggleFavorite = (code) => {
    if (!code) return;
    addFavorite(code);
  };

  const nextPage = () => gotoPage(currentPage + 1);
  const prevPage = () => gotoPage(currentPage - 1);

  return (
    <div className="p-4">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border p-2 mb-4 w-full max-w-md ${
          isDark
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
        type="text"
        placeholder="Search by country name or capital...."
      />
      <div className="border flex flex-wrap gap-4 items-center justify-center">
        {currentCountries.length === 0 ? (
          countries.length === 0 ? (
            <p>Loading countries...</p>
          ) : filteredCountries.length === 0 ? (
            <p>No countries match your search.</p>
          ) : (
            <p>No countries on this page.</p>
          )
        ) : (
          currentCountries.map((country, index) => {
            return (
              <div
                key={country?.cca3 || `country-${index}`}
                className={`border w-72 h-72 p-4 cursor-pointer hover:bg-gray-100 relative ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
                onClick={() => navigate(`/country/${country.cca3}`)}
              >
                <h1>Country: {country?.name?.common || "Unknown"}</h1>
                <p>Official: {country?.name?.official || "Unknown"}</p>
                <p>Capital: {country?.capital?.[0] || "N/A"}</p>
                <p>Weather: {Math.floor(Math.random() * 30) + 10}°C ☀️</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(country.cca3);
                  }}
                  className={`absolute top-2 right-2 px-2 py-1 rounded text-white ${
                    favorites.includes(country.cca3)
                      ? "bg-green-300"
                      : "bg-blue-500"
                  }`}
                >
                  Like
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {(() => {
          const pageButtons = [];
          for (let p = 1; p <= totalPages; p++) {
            pageButtons.push(
              <button
                key={p}
                onClick={() => gotoPage(p)}
                className={`px-3 py-1 border rounded ${
                  p === currentPage ? "bg-gray-200" : ""
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            );
          }
          return pageButtons;
        })()}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
