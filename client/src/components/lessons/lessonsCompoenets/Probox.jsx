import React from "react";
import styles from "./Probox.module.css";
import NoneImage from "./NoneImage.svg";
import { useState } from "react";

import heart from "./CHeart.svg";
import Eheart from "./EHeart.svg";

const Probox = () => {
  const [displayHeart, setDisplayHeart] = useState("heart");
  return (
    <div>
      <div>
        <div className={styles.cover}>
          <div className={styles.iconwrap}>
            <img src={NoneImage} alt="None" className={styles.non} />
          </div>
          <div className={styles.text}>
            <h3> Pro name </h3>
            <span> Pro detail golf course </span>
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
            <div>
              <span> Date </span> <br />
              <span> Time </span>
            </div>{" "}
            <br />
            <button> view details </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Probox;
