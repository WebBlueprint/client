import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DrivingRange.module.css";
import DrivingRangeReview from "./DrivingRangeReview";

const DrivingRange = () => {
  const [data, setData] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [showReviews, setShowReviews] = useState([]);

  useEffect(() => {
    const popularPros = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/lesson/my-driving-range",
          {},
          { withCredentials: true }
        );
        setData(response.data);
        // Initialize selectedRanges and showReviews arrays with false values
        setSelectedRanges(new Array(response.data.length).fill(false));
        setShowReviews(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    popularPros();
  }, []);

  const handleProListClick = (index) => {
    setSelectedRanges((prevSelectedRanges) => {
      const newSelectedRanges = [...prevSelectedRanges];
      newSelectedRanges[index] = !newSelectedRanges[index];
      return newSelectedRanges;
    });
    setShowReviews((prevShowReviews) => {
      const newShowReviews = [...prevShowReviews];
      newShowReviews[index] = false; // Hide the review when switching to Pro List
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
      newSelectedRanges[index] = false; // Unselect the range when Review is clicked
      return newSelectedRanges;
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
                    <div>하트 들어가고</div>
                  </div>
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
                                <div  className= {styles.imgbox} > </div> 
                                <div  className={styles.protext}>  {pro.proName} </div>
                            <button>Details</button>  </div>
                        
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
