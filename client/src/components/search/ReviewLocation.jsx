import styles from "./ReviewLocation.module.css";
import { useState } from "react";
import Data from "./ReviewLocationData";

const ReviewLocation = () => {
  const [showData, setShowData] = useState(false);

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.image}> google Map </div>
        <div className={styles.text}>
          <h3> 타이틀 </h3>
          <div>주소 </div>
          <div> 별이 몇개 </div>
        </div>

        <div className={styles.btnbox}>
          <button> View Details </button>
          <button
            onClick={() => {
              setShowData(!showData);
            }}
          >
            {" "}
            View Pros{" "}
          </button>
        </div>
      </div>
      <br />
      {showData && (
        <div className={styles.centered}>
          <Data />
        </div>
      )}
    </div>
  );
};

export default ReviewLocation;
