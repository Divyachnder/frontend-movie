// src/pages/Home.js
import React, { useEffect, useState, useContext } from "react";
import { getMovies } from "../api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(); // API call to backend
        setMovies(data);
      } catch (err) {
        setError(err.message || "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        🎥 Movie Reviews
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 hover:scale-105 transition-transform"
            >
              <img
                src={movie.poster || "/images/placeholder.png"}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {movie.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                {movie.genre} • {movie.year}
              </p>
              <p className="text-yellow-500 font-bold mb-3">
                ⭐ {movie.rating?.toFixed(1) || "N/A"}
              </p>

              {user ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Rate / Review
                </button>
              ) : (
                <p className="text-sm text-gray-500 italic">Login to rate</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
