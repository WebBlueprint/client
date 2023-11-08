import styles from "./Golfbox.module.css";
import { useState } from "react";
import Golfboxtext from "./Golfboxtext";
import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";

const Golfbox = () => {
  const [showBaby, setShowBaby] = useState(false);
  const [displayHeart, setDisplayHeart] = useState("heart"); // Initially display the 'heart' image

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
          <button> Make a Review </button>
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
      {showBaby && (
        <div className={styles.centered}>
          <Golfboxtext />
        </div>
      )}
    </div>
  );
};

export default Golfbox;
