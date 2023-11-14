import React, { useState } from "react";
import styles from "../booking/booking.module.css";
import NoneImage from "./NoneImage.svg";

function MyPro() {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleCoverClick = () => {
      setIsClicked(!isClicked);
    };

    return (
    <div>
     <div
        className={`${styles.cover} ${isClicked && styles.clicked}`}
        onClick={handleCoverClick}
      >
        <div className={styles.iconwrap}>
            <img src={NoneImage} alt="None" className={styles.non} />
        </div>
        <div className={styles.text}>
            <h3> My Pro </h3>
            <span> Reaming 10 Lessons (10/20) </span>
             <button className={styles.chatButton}>Chat with Pro</button>
        </div>
    </div>
    </div>
    );
}
export default MyPro;
