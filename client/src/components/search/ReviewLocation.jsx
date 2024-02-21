import React, { useState, useEffect } from "react";
import styles from "./ReviewLocation.module.css";

const ReviewLocation = ({ locationData, locationName }) => {
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // locationData가 비어있거나 undefined인 경우 초기화
    setData(locationData || {});
  }, [locationData]);

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.image}>Google Map</div>
        <div className={styles.text}>
          <h3>{locationName || data.name || "No Name"}</h3>
          <h3>{data.address && `Address: ${data.address}`}</h3>
          <h3>{data.rating && `Rating: ${data.rating}`}</h3>
          <h3>{data.reviews_count && `Reviews Count: ${data.reviews_count}`}</h3>
        </div>

        <div className={styles.btnbox}>
          <button>View Details</button>
          <button onClick={() => setShowData(!showData)}>View Pros</button>
        </div>
      </div>
      <br />
      {showData && (
        <div className={styles.centered}>
        </div>
      )}
    </div>
  );
};

export default ReviewLocation;
