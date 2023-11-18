import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const GolfboxReview = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoveredRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = () => {
    onSubmit({ rating, comment });
  };

  const getStarColor = (starValue) => {
    if (starValue <= rating || (starValue <= hoveredRating && hoveredRating !== 0)) {
      return "#fcc419"; // Fully filled star
    } else if (starValue - 0.5 === rating || (starValue - 0.5 === hoveredRating && hoveredRating !== 0)) {
      return "#ffa500"; // Half-filled star
    } else {
      return "gray"; // Empty star
    }
  };

  return (
    <div>
        골프장 리뷰 
      <Wrap>
        <Stars>
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={index}
                  onMouseEnter={() => handleMouseEnter(ratingValue)}
                  onMouseLeave={handleMouseLeave}
                  starColor={getStarColor(ratingValue)}
                  onClick={() => handleStarClick(ratingValue)}
                />
              );
            })}
        </Stars>
        <RatingValue>{rating} / 5</RatingValue>
      </Wrap>

      <Textarea
        rows="4"
        cols="50"
        placeholder="Write your comment here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      /><br />
      <SubmitButton onClick={handleSubmitReview}>Submit Review</SubmitButton>
    </div>
 
  );
};

export default GolfboxReview;

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

const Textarea = styled.textarea`
  margin-top: 10px;
  padding: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
`;

