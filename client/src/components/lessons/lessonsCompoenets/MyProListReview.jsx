import React, { useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styled from "styled-components";

const MyProListReview = ({ onClose, active, proName, golfCourseName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReviewSubmitted, setReviewSubmitted] = useState(false);
  const userId = "user1";
  const proNames = "홍길동";
  const [showWarning, setShowWarning] = useState(false); // New state to handle showing/hiding warning

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoveredRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === "") { // Check if rating or comment is empty
      setShowWarning(true); // Show warning if either rating or comment is empty
      return; // Exit function early if either rating or comment is empty
    }

    try {
      const response = await fetch('https://p-match-ec61fc56d612.herokuapp.com/lesson/make-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          proName: proNames,
          star: rating,
          comment: comment,
        }),
      });
  
      if (response.ok) {
        setReviewSubmitted(true);
        onClose();
      } else {
        console.error('Review submission failed');
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
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
          <p> Please review {proName} who works at {golfCourseName}! </p>
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
          placeholder={`Write your review for ${proName} at ${golfCourseName} here`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {showWarning && ( // Conditional rendering for the warning message
          <WarningMessage>
            Please provide both rating and comment.
          </WarningMessage>
        )}
        <ButtonsWrapper>
          <SubmitButton onClick={handleSubmitReview}>Submit Review</SubmitButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonsWrapper>
      </Container>
    </Overlay>
  );
};

export default MyProListReview;

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
  background-color:#1B4607;
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
  align-items: center; 
  justify-content: center; 
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
  margin-top: 10px;
  grid-column: span 2;
  button + button {
    margin-left: 10px; 
  }
  
`;

const WarningMessage = styled.p`
  color: red;
  margin-top: 5px;
  grid-column: span 2; // Spanning both columns
`;

const TextMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  grid-column: span 2; 
`;
