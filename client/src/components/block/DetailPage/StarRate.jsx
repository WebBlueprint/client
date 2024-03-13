import React, { useState, useEffect } from 'react';
import { ReactComponent as FaStar } from "./FaStar.svg";
import { ReactComponent as FaStarHalfAlt } from "./FaStarHalfAlt.svg";

const StarRating = ({ rating }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);


  return (
    <div style={{ display: "inline-block" }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <div
            key={index}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            {ratingValue <= Math.floor(currentRating) ? (
              <FaStar style={{ fill: "#1B4607", width: "2em", height: "2em" }} />
            ) : ratingValue - 0.5 === currentRating ? (
              <FaStarHalfAlt style={{ fill: "#1B4607", width: "2em", height: "2em" }} />
            ) : (
              <FaStar style={{ fill: "#e4e5e9", width: "2em", height: "2em" }} />
            )}
          </div>
        );
      })}
      <p style={{ display: "inline-block", marginLeft: "0.5em" }}>StarAvarage: {currentRating} / 5</p>
    </div>
  );
};

export default StarRating;
