import React, { useState } from "react";
import { addReview } from "../api";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review) return;
    await addReview(movieId, { text: review });
    setReview("");
    onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="border rounded p-2 mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
