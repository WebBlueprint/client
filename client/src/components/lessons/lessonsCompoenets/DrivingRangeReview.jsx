// MyProListReview.jsx
import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const DrivingRangeReview = ({ onClose, active, onSubmit }) => {
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
    onClose(); // Close the modal after submitting the review
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
    <Overlay active={active}>

      <Container>

        <TextMain>
        <p> Please review who works at </p>
        </TextMain>

        <StarsAndRating>
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
        </StarsAndRating>

        <Textarea
          rows="4"
          cols="50"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
<ButtonsWrapper>
  <SubmitButton onClick={handleSubmitReview}>Submit Review</SubmitButton>
  <CloseButton onClick={onClose}>Close</CloseButton>
</ButtonsWrapper>
      </Container>
    </Overlay>
  );
};

export default DrivingRangeReview;

const Container = styled.div`
  position: relative;
  width: 60%;
  left: 15%;
  display: grid;
  grid-template-columns: 20% 70%;
  gap: 15px;
  padding: 1em;
  border-radius: 1em;
  align-items: center;
  padding-left: 6em;
  background-color: white;
  top:30%;
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
  grid-column: 2 / span 1;
  grid-row: 2 / span 2;
  display: flex;
  position: relative;
  width: 8em;
`;

const CloseButton = styled.button`
  margin-top: 2px;
  padding: 10px;
  cursor: pointer;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  grid-column: 2 / span 1;
  grid-row: 4 / span 2;
  display: flex;
  position: relative;
  width: 8em;
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;

  ${(props) => props.active && `
    display: block;
  `}
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; // 필요한 경우에 조절하세요.
  grid-column: span 2; // 전체 그리드의 2개의 열을 차지하도록 설정
  /* 버튼 간격을 위한 스타일 */
  button + button {
    margin-left: 10px; // 원하는 간격 조절
  }
  
`;



const TextMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; // 필요한 경우에 조절하세요.
  grid-column: span 2; // 전체 그리드의 2개의 열을 차지하도록 설정
`;