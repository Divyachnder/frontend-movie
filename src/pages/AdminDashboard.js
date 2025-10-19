// src/pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, isDarkMode } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterUrl: "",
  });

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/movies", formData);
      setFormData({ title: "", description: "", posterUrl: "" });
      fetchMovies();
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  // Delete movie
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  // Optional: Edit movie
  const handleEdit = async (id) => {
    const newTitle = prompt("Enter new title");
    const newDesc = prompt("Enter new description");
    const newPoster = prompt("Enter new poster URL");

    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, {
        title: newTitle,
        description: newDesc,
        posterUrl: newPoster,
      });
      fetchMovies();
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  if (!user || user.role !== "admin") {
    return <p className="p-6">You are not authorized to view this page.</p>;
  }

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-6`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* Add Movie Form */}
      <form onSubmit={handleAddMovie} className="mb-6 p-4 border rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">Add New Movie</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={formData.posterUrl}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Movie
        </button>
      </form>

      {/* Movie List */}
      <h3 className="text-2xl font-bold mb-4">All Movies</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="border rounded p-4 shadow hover:shadow-lg">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-60 object-cover rounded" />
            <h4 className="text-xl font-bold mt-2">{movie.title}</h4>
            <p>{movie.description}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(movie._id)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
