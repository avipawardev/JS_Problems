import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const Favorites = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const promises = favorites.map((code) =>
          axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
        );
        const results = await Promise.all(promises);
        const favCountries = results.map((res) => res.data[0]);
        setCountries(favCountries);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div
      className={`p-4 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
      {countries.length === 0 ? (
        <p>No favorites yet. Go to Home and like some!</p>
      ) : (
        <div
          className={`border flex flex-wrap gap-4 items-center justify-center ${
            isDark ? "border-gray-600" : "border-gray-300"
          }`}
        >
          {countries.map((country) => (
            <div
              key={country.cca3}
              className={`border w-72 h-72 p-4 ${
                isDark
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <Link to={`/country/${country.cca3}`}>
                <h1>Country: {country.name.common}</h1>
                <p>Official: {country.name.official}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
