// MyProList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyProList.module.css";
import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";
import MyProListReview from "./MyProListReview";

const MyProList = () => {
  const [data, setData] = useState([]);
  const user_Id = "user1";
  const [selectedPros, setSelectedPros] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [heartState, setHeartState] = useState({});
  const [showReviews, setShowReviews] = useState([]);

  useEffect(() => {
    const fetchProsForUser = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/my-pro-list/${user_Id}`
        );
        setData(response.data);

        // Initialize selectedPros and showDetails arrays
        setSelectedPros(new Array(response.data.length).fill(false));
        setShowDetails(new Array(response.data.length).fill(false));

        // Initialize heartState based on data
        const initialHeartState = {};
        response.data.forEach((pro) => {
          initialHeartState[pro.proName] = false;
        });
        setHeartState(initialHeartState);

        // Initialize showReviews array
        setShowReviews(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error during request:", error);
        console.error("Error response data:", error.response?.data);
      }
    };

    fetchProsForUser();
  }, [user_Id]);

  const handleProClick = (index) => {
    setSelectedPros((prevSelectedPros) => {
      const newSelectedPros = [...prevSelectedPros];
      newSelectedPros[index] = !newSelectedPros[index];
      return newSelectedPros;
    });
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = false;
      return newShowDetails;
    });
  };

  const handleDetailsClick = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
    setSelectedPros((prevSelectedPros) => {
      const newSelectedPros = [...prevSelectedPros];
      newSelectedPros[index] = false;
      return newSelectedPros;
    });
  };

  const handleHeartClick = (proName) => {
    setHeartState((prevHeartState) => {
      const newHeartState = {
        ...prevHeartState,
        [proName]: !prevHeartState[proName],
      };

      // Save newHeartState to console with pro name
      console.log("Heart State:", newHeartState);

      sessionStorage.setItem("heartState", JSON.stringify(newHeartState));

      return newHeartState;
    });
  };

  const handleReviewClick = (index) => {
    setShowReviews((prevShowReviews) => {
      const newShowReviews = [...prevShowReviews];
      newShowReviews[index] = !newShowReviews[index];
      return newShowReviews;
    });
  };

  const closeModal = (index) => {
    setShowReviews((prevShowReviews) => {
      const newShowReviews = [...prevShowReviews];
      newShowReviews[index] = false;
      return newShowReviews;
    });
  };

  const submitReview = (reviewData) => {
    // You can handle the submission of the review data here
    console.log("Submitting review:", reviewData);
  };

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((pro, index) => (
          <div key={`pro-${index}-${pro.user_id}`} className={styles.proboxs}>
            <div className={styles.protextbox}>
              <span>{pro.proName}</span>
              <div className={styles.golfboxtext}>{pro.golfCourseName}</div>
            </div>
            <img
              src={heartState[pro.proName] ? heart : Eheart}
              alt="heart"
              onClick={() => handleHeartClick(pro.proName)}
            />
            <div>
              <button className={styles.Chat}> Chat Now </button>
              <button
                className={styles.Review}
                onClick={() => handleReviewClick(index)}
              >
                Review
              </button>
            </div>
            {showReviews[index] && (
              <div
                key={`overlay-${index}`}
                className={`${styles.overlay} ${showReviews[index] && styles.active}`}
                onClick={() => closeModal(index)}
              />
            )}
            {showReviews[index] && (
              <MyProListReview
                key={`review-${data[index].golfCourseId}`}
                onClose={() => closeModal(index)}
                active={showReviews[index]}
                proName={data[index].proName}
                golfCourseName={data[index].golfCourseName}
                onSubmit={submitReview} // Pass the submitReview function
              />
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyProList;