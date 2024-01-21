import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DrivingRange.module.css";
import DrivingRangeReview from "./DrivingRangeReview";

const DrivingRange = () => {
  const [data, setData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const popularPros = async () => {
      try {
        const response = await axios.get(
          "https://p-match-ec61fc56d612.herokuapp.com/lesson/my-driving-range",
          {},
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };
    popularPros();
  }, []);

  const handleProListClick = (golfCourseName) => {
    // Toggle the selected range or set it to null if already selected
    setSelectedRange((prevSelectedRange) =>
      prevSelectedRange === golfCourseName ? null : golfCourseName
    );
    // Set the state to hide the review modal
    setShowReviewModal(false);
  };

  const handleReviewClick = () => {
    // Toggle the state to show/hide the review modal
    setShowReviewModal((prevShowReviewModal) => !prevShowReviewModal);
    // Set the state to null to unselect the range
    setSelectedRange(null);
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
                    onClick={() => handleProListClick(data[index].golfCourseName)}
                  >
                    Pro List
                  </button>
                  <button className={styles.review} onClick={handleReviewClick}>
                    Make a Review
                  </button>
                </div>

                {selectedRange === data[index].golfCourseName && (
                  <div>
                    {data[index].pros && data[index].pros.length > 0 && (
                      <div>
                        {data[index].pros.map((pro, proIndex) => (
                          <div key={`pro-${proIndex}-${pro.proName}`}>
                            <div>Pro Name: {pro.proName}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

{showReview && (
  <DrivingRangeReview
    key={`review-${data[index].golfCourseId}`}
    golfCourseId={data[index].golfCourseId}
    reviews={data[index].reviews} // Assuming reviews is an array of objects
    isOpen={selectedRange === data[index].golfCourseName}
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
