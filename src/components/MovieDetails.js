import React, { useState, useEffect } from "react";
import { getMovie } from "../api";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    const { data } = await getMovie(id);
    setMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-gray-900 dark:text-white">Loading...</p>;

  return (
    <div className="p-4 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="my-2">Genre: {movie.genre}</p>
      <p className="my-2">Rating: {movie.rating} ⭐</p>
      <p className="my-2">{movie.description}</p>
      <h2 className="text-2xl mt-4">Reviews</h2>
      <ul className="my-2">
        {movie.reviews?.map((rev, i) => (
          <li key={i} className="border-b py-2">{rev.text} - <b>{rev.user}</b></li>
        ))}
      </ul>
      <ReviewForm movieId={id} onReviewAdded={fetchMovie} />
    </div>
  );
};

export default MovieDetails;
