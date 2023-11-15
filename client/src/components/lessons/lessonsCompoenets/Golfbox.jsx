// Golfbox.jsx
import React, { useState } from "react";
import styles from "./Golfbox.module.css";
import GolfboxReview from "./GolfboxReview";
import Probox from "./Probox"; // Import Probox component
import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";
import styled from "styled-components";

const Golfbox = () => {
  const [showBaby, setShowBaby] = useState(false);
  const [displayHeart, setDisplayHeart] = useState("heart");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const handleMakeReviewClick = () => {
    setIsModalOpen(true);
  };


  const handleCommentSubmit = (data) => {
    setIsModalOpen(false);
    setReviewData(data);
  };

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.image}> google Map </div>
        <div className={styles.text}>
          <h3> 타이틀 </h3>
          <span>주소 </span>
          <div> 별이 몇개 </div>
        </div>

        <div className={styles.btnbox}>
          <div>
            {displayHeart === "heart" && (
              <img
                src={heart}
                alt="None"
                className={styles.heart}
                onClick={() => setDisplayHeart("Eheart")}
              />
            )}
            {displayHeart === "Eheart" && (
              <img
                src={Eheart}
                alt="None"
                className={styles.heart}
                onClick={() => setDisplayHeart("heart")}
              />
            )}
          </div>
          <button> View Details </button>
          <button onClick={handleMakeReviewClick}> Make a Review </button>
          <button
            onClick={() => {
              setShowBaby(!showBaby);
            }}
          >
            View Pros
          </button>
        </div>
      </div>
      <br />
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <GolfboxReview onSubmit={handleCommentSubmit} />
          </ModalContent>
        </Modal>
      )}
      {reviewData && (
        <div>
          <p>Rating: {reviewData.rating}</p>
          <p>Comment: {reviewData.comment}</p>
        </div>
      )}

      {showBaby && (
        <div className={styles.centered}>
          {/* Use the Probox component instead of Golfboxtext */}
          <Probox />
        </div>
      )}
    </div>
  );
};

export default Golfbox;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.5); /* Black with 50% transparency */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;