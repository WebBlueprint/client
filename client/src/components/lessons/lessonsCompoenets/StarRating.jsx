import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ rating, onStarClick }) => { // Accept rating and onStarClick as props
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (newRating) => {
    onStarClick(newRating); // Call the onStarClick function with the new rating
  };


  const getStarColor = (starValue) => {
    if (starValue <= rating) {
      return "#fcc419"; // Fully filled star
    } else if (starValue - 0.5 === rating) {
      return "#ffa500"; // Half-filled star
    } else {
      return "gray"; // Empty star
    }
  };

  return (
    <Wrap>
      <Stars>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Star
                key={index}
                onClick={() => handleStarClick(ratingValue)}
                onMouseEnter={() => setHoveredRating(ratingValue)}
                onMouseLeave={() => setHoveredRating(0)}
                starColor={getStarColor(ratingValue)}
              />
            );
          })}
      </Stars>
      <RatingValue> {rating} / 5</RatingValue>
    </Wrap>
  );
};

export default StarRating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;
`;

const Star = styled((props) => {
  if (props.starColor === "#fcc419") {
    return <FaStar {...props} />;
  } else if (props.starColor === "#ffa500") {
    return <FaStarHalf {...props} />;
  } else {
    return <FaStar {...props} />;
  }
})`
  color: ${(props) => props.starColor};
  cursor: pointer;
`;

const RatingValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
`;
