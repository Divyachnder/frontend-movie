import React, { useState } from "react";
import axios from "axios";

export default function MovieCard({ movie, setMovies, user }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const submitReview = async () => {
    if (!user) {
      alert("Please login to review");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/movies/${movie._id}/review`, {
        username: user.username,
        rating: Number(rating),
        comment: review,
      });

      // Refresh movie list
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);

      setRating(0);
      setReview("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg bg-gray-50 dark:bg-gray-800">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-60 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{movie.title}</h3>
      <p>{movie.description}</p>

      {user && user.role === "user" && (
        <>
          <div className="mt-2">
            <label>Rate: </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-12 border"
            />
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
            className="w-full border mt-2 p-1"
          />

          <button
            onClick={submitReview}
            className="mt-2 w-full bg-green-500 text-white py-1 rounded"
          >
            Submit Review
          </button>
        </>
      )}

      <div className="mt-2">
        <h4 className="font-bold">Reviews:</h4>
        {movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((r, i) => (
            <div key={i} className="border-t mt-1 pt-1">
              <p><strong>{r.username}</strong>: {r.comment} ⭐ {r.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {user && user.role === "admin" && (
        <p className="mt-2 text-sm text-blue-500">Admin can edit or delete this movie from dashboard</p>
      )}
    </div>
  );
}
