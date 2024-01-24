// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DrivingRange.module.css";
import DrivingRangeReview from "./DrivingRangeReview";
import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";

const DrivingRange = () => {
  const [data, setData] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [showReviews, setShowReviews] = useState([]);
  const [heartState, setHeartState] = useState({});
  const [golfCourseNames, setGolfCourseNames] = useState([]);
  const user_Id = "user1";

  useEffect(() => {
    const mydrivingrange = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com//lesson/my-driving-range/${user_Id}`
        );
        setData(response.data);
        setSelectedRanges(new Array(response.data.length).fill(false));
        setShowReviews(new Array(response.data.length).fill(false));
        setHeartState({});
        setGolfCourseNames(response.data.map((item) => item.golfCourseName));
      } catch (error) {
        console.error("my-driving-range:", error);
      }
    };
    mydrivingrange();
  }, []);

  const handleProListClick = (index) => {
    setSelectedRanges((prevSelectedRanges) => {
      const newSelectedRanges = [...prevSelectedRanges];
      newSelectedRanges[index] = !newSelectedRanges[index];
      return newSelectedRanges;
    });
    setShowReviews((prevShowReviews) => {
      const newShowReviews = [...prevShowReviews];
      newShowReviews[index] = false;
      return newShowReviews;
    });
  };

  const handleReviewClick = (index) => {
    setShowReviews((prevShowReviews) => {
      const newShowReviews = [...prevShowReviews];
      newShowReviews[index] = !newShowReviews[index];
      return newShowReviews;
    });
    setSelectedRanges((prevSelectedRanges) => {
      const newSelectedRanges = [...prevSelectedRanges];
      newSelectedRanges[index] = false;
      return newSelectedRanges;
    });
  };

  const handleHeartClick = (golfCourseId, golfCourseName) => {
    setHeartState((prevHeartState) => {
      const newHeartState = {
        ...prevHeartState,
        [golfCourseName]: !prevHeartState[golfCourseName]
      };
  
      // Save newHeartState to console with golf course id
      console.log("Heart State:", newHeartState);

      sessionStorage.setItem("heartState", JSON.stringify(newHeartState));
  
      return newHeartState;
    });
  };
  

  return (
    <div>
      {data.map((golfboxData, index) => (
        <div key={`golfbox-${index}-${data[index].golfCourseName}`}>
          <div>
            {data.length > 0 ? (
              <>
                <div className={styles.probox}>
                  <div className={styles.mapimg}>
                    map id {data[index].address.coordinates[0]}{" "}
                    {data[index].address.coordinates[1]}
                  </div>
                  <div className={styles.textbox}>
                    <b>{data[index].golfCourseName}</b>
                    
                  </div>
                  <img
  src={heartState[data[index].golfCourseName] ? heart : Eheart}
  alt="heart"
  onClick={() =>
    handleHeartClick(
      data[index].golfCourseId,
      data[index].golfCourseName
    )
  }
/>

                  <button
                    className={styles.prolist}
                    onClick={() => handleProListClick(index)}
                  >
                    Pro List
                  </button>
                  <button
                    className={styles.review}
                    onClick={() => handleReviewClick(index)}
                  >
                    Make a Review
                  </button>

                </div>

                {selectedRanges[index] && (
                  <div>
                    {data[index].pros && data[index].pros.length > 0 && (
                      <div>
                        {data[index].pros.map((pro, proIndex) => (
                          <div key={`pro-${proIndex}-${pro.proName}`}>
                            <div className={styles.pronamebox}>
                              <div className={styles.imgbox}></div>
                              <div className={styles.protext}>{pro.proName}</div>
                              <button>Details</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {showReviews[index] && (
                  <DrivingRangeReview
                    key={`review-${data[index].golfCourseId}`}
                  />
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrivingRange;
