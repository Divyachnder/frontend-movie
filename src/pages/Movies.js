// pages/Movies.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async (movieId) => {
    if (!user) return alert("Login to add review");
    try {
      await axios.post(
        `http://localhost:5000/api/movies/${movieId}/review`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComment("");
      setRating(0);
      fetchMovies(); // refresh
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div key={movie._id} className="border rounded p-4 shadow-md">
          <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover mb-2" />
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p className="text-sm mb-2">{movie.description}</p>
          <div className="mb-2">
            <strong>Reviews:</strong>
            {movie.reviews.length ? (
              movie.reviews.map((r) => (
                <div key={r._id} className="text-sm">
                  {r.username}: {r.rating}⭐ - {r.comment}
                </div>
              ))
            ) : (
              <div className="text-sm">No reviews yet</div>
            )}
          </div>

          {user && (
            <div className="mt-2">
              <input
                type="number"
                placeholder="Rating 1-5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min={1}
                max={5}
                className="border p-1 w-16 mr-2"
              />
              <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-1 mr-2"
              />
              <button
                onClick={() => handleReview(movie._id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
