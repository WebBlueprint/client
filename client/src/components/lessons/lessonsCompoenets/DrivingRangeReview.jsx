import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const DrivingRangeReview = ({ onSubmit, golfCourseId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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
    <Container>
      <StarsAndRating>
      <div>
          <h2>{proName}</h2>
          <p>{golfCourseName}</p>
        </div>
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
        <RatingValue>{rating} / 7</RatingValue>
      </StarsAndRating>

      <Textarea
        rows="4"
        cols="50"
        placeholder="Write your comment here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <SubmitButton onClick={handleSubmitReview}>Submit Review</SubmitButton>
    </Container>
  );
};

export default DrivingRangeReview;

const Container = styled.div`
position:relative;
width: 80%;
left:8%;
  display: grid;
  grid-template-columns: 20% 70%;
    gap: 15px; /* 각 열 사이의 간격 */
  padding: 1em;
  border: 1px solid #1B4607;
  border-radius: 1em;
  align-items: center;
  padding-left:6em;
`;

const StarsAndRating = styled.div`
  display: flex;
  align-items: center;
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
  margin-left: 10px;
`;

const Textarea = styled.textarea`
  margin-top: 10px;
  padding: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: 2px;
  padding: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  grid-column: 2 / span 1; /* 수정된 부분: SubmitButton을 두 번째 열로 이동 */
  grid-row: 2 / span 2;    /* 수정된 부분: SubmitButton을 첫 번째 행으로 이동 */
  display: flex;
  position: relative;
  width: 8em;
`;