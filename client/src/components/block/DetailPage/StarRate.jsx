import React, { useState, useEffect } from 'react';
import { ReactComponent as FaStar } from "./FaStar.svg";
import { ReactComponent as FaStarHalfAlt } from "./FaStarHalfAlt.svg";

const StarRating = ({ rating }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const roundedRating = Math.ceil(currentRating * 2) / 2; // 별점을 반올림하여 0.5 단위로 나누기

  return (
    <div style={{ display: "inline-block" }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <div
            key={index}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            {ratingValue <= Math.floor(roundedRating) ? (
              <FaStar style={{ fill: "#1B4607", width: "2em", height: "2em" }} />
            ) : ratingValue - 0.5 === roundedRating ? (
              <FaStarHalfAlt style={{ fill: "#1B4607", width: "2em", height: "2em" }} />
            ) : (
              <FaStar style={{ fill: "#e4e5e9", width: "2em", height: "2em" }} />
            )}
          </div>
        );
      })}
      <p style={{ display: "inline-block", marginLeft: "0.5em" }}>StarAvarage: {roundedRating} / 5</p>
    </div>
  );
};

export default StarRating;
