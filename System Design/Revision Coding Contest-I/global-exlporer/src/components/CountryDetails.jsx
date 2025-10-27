import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        setCountry(res.data[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <div
      className={`p-4 min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Link
        to="/"
        className={`mb-4 inline-block px-4 py-2 border rounded ${
          isDark
            ? "border-gray-600 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
      >
        Back to Home
      </Link>
      <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-32 h-20 mb-4"
      />
      <p>
        <strong>Official Name:</strong> {country.name.official}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Area:</strong> {country.area.toLocaleString()} km
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Currencies:</strong>{" "}
        {country.currencies
          ? Object.keys(country.currencies).join(", ")
          : "N/A"}
      </p>
    </div>
  );
};

export default CountryDetails;
