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
  const user_Id = "윤승우";

  useEffect(() => {

    const mydrivingrange = async () => {
      try {
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/my-driving-range/${user_Id}`
        );
        console.log(response.data)
        // Assuming the response is an array, otherwise handle accordingly
        console.log("test", Array(response.data) )
          const formattedData = Array(response.data) ?  Array(response.data)  : [];
        setData(formattedData);
        setSelectedRanges(new Array(formattedData.length).fill(false));
        setShowReviews(new Array(formattedData.length).fill(false));
        setHeartState({});
        setGolfCourseNames(formattedData.map((item) => item.golfCourseName));
      } catch (error) {
        console.error("my-driving-range:", error);
      }
    };
    mydrivingrange();
  }, []);

  const handleHeartClick = (golfCourseId, golfCourseName) => {
    setHeartState((prevHeartState) => {
      const newHeartState = {
        ...prevHeartState,
        [golfCourseName]: !prevHeartState[golfCourseName]
      };
  
      console.log("Heart State:", newHeartState);
  
      sessionStorage.setItem("heartState", JSON.stringify(newHeartState));
  
      return newHeartState;
    });
  };
  
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

  return (
    <div>
      {data.map((golfboxData, index) => (
        <div key={`golfbox-${index}-${golfboxData.golfCourseName}`}>
          <div>
            {data.length > 0 ? (
              <>
                <div className={styles.probox}>
                  <div className={styles.mapimg}>
                    {golfboxData.address && golfboxData.address.coordinates && (
                      `map id ${golfboxData.address.coordinates[0]} ${golfboxData.address.coordinates[1]}`
                    )}
                  </div>
                  <div className={styles.textbox}>
                    <b>{golfboxData.golfCourseName}</b>
                  </div>
                  <img
                    src={heartState[golfboxData.golfCourseName] ? heart : Eheart}
                    alt="heart"
                    onClick={() =>
                      handleHeartClick(
                        golfboxData.golfCourseId,
                        golfboxData.golfCourseName
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
                    {golfboxData.pros && golfboxData.pros.length > 0 && (
                      <div>
                        {golfboxData.pros.map((pro, proIndex) => (
                          <div key={`pro-${proIndex}-${pro.proName}`}>
                            <div className={styles.pronamebox}>
                              <div className={styles.imgbox}></div>
                              <div className={styles.protext}>{pro.proName}</div>
                              <button>Detail</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {showReviews[index] && (
                  <DrivingRangeReview
                    key={`review-${golfboxData.golfCourseId}`}
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
