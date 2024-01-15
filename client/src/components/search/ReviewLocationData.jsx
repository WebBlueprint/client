// ReviewLocation 컴포넌트
import styles from "./ReviewLocation.module.css";
import { useState } from "react";

const ReviewLocation = ({ locationData, locationName }) => {
  const [showData, setShowData] = useState(false);

  const data = locationData || {};

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.image}>Google Map</div>
        <div className={styles.text}>
          <h3>{locationName || data.name || "No Name"}</h3>
          <div>{data.address && `Address: ${data.address}`}</div>
          <div>{data.rating && `Rating: ${data.rating}`}</div>
          <div>{data.reviews_count && `Reviews Count: ${data.reviews_count}`}</div>
        </div>

        <div className={styles.btnbox}>
          <button>View Details</button>
          <button onClick={() => setShowData(!showData)}>View Pros</button>
        </div>
      </div>
      <br />
      {showData && (
        <div className={styles.centered}>
          {/* Data 컴포넌트에도 locationData를 전달할 수 있음 */}
          {/* <Data locationData={locationData} /> */}
          {/* Data 컴포넌트를 사용하려면 주석을 해제하세요 */}
        </div>
      )}
    </div>
  );
};

export default ReviewLocation;
