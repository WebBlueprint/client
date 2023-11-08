import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const ProboxReview = ({ onSubmit, rating, comment }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (newRating) => {
    onSubmit(newRating, comment); // Call the onSubmit function with the new rating
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
    <div>
      <Wrap>
        <Stars>
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={index}
                  onMouseEnter={() => setHoveredRating(ratingValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  starColor={getStarColor(ratingValue)}
                />
              );
            })}
        </Stars>
        <RatingValue> {rating} / 5</RatingValue>
      </Wrap>

      <textarea
        rows="4"
        cols="50"
        placeholder="Write your comment here"
        value={comment} // Update the comment
      />
      <button onClick={() => onSubmit(rating, comment)}>Submit Review</button>
    </div>
  );
};

export default ProboxReview;

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
