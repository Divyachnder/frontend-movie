import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMovies } from "../api";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login"); // protect route
    fetchMovies();
  }, [user]);

  const fetchMovies = async () => {
    const { data } = await getMovies();
    setMovies(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className="mt-6 text-gray-900 dark:text-white">
        <p>Total Movies: {movies.length}</p>
        <p>Welcome, {user?.name}</p>
      </div>
    </div>
  );
};

export default Dashboard;
