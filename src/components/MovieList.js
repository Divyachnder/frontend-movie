import React, { useEffect, useState } from "react";
import { getMovies } from "../api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading movies...</p>;

  if (movies.length === 0)
    return <p className="text-center text-gray-500 mt-8">No movies found.</p>;

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={movie.image}
            alt={movie.title}
            className="h-64 w-full object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Genre: {movie.genre}
            </p>
            <p className="text-yellow-500 font-medium mt-2">
              ⭐ {movie.rating}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
