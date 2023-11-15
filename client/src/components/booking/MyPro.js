import React, { useState } from "react";
import styles from "../booking/booking.module.css";
import NoneImage from "./NoneImage.svg";

function MyPro({ name, lesson, onItemClick, isActive }) {
  const handleCoverClick = () => {
    onItemClick();
  };

  return (
    <div>
      <div
        className={`${styles.cover} ${isActive && styles.clicked}`}
        onClick={handleCoverClick}
      >
        <div className={styles.iconwrap}>
          <img src={NoneImage} alt="None" className={styles.non} />
        </div>
        <div className={styles.text}>
          <h3>{name}</h3>
          <span>Remaining Lessons {lesson}</span>
          <button className={styles.chatButton}>Chat with Pro</button>
        </div>
      </div>
    </div>
  );
}

export default MyPro;
