import React, { useState } from "react";
import styles from "../booking/booking.module.css";

function MyPro({ name, lesson, onItemClick, isActive }) {
  const handleCoverClick = () => {
    onItemClick();
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.Procontainer}>
        {/* Content for the first container */}
      </div>
      <div className={styles.Procontainer}>
        {/* Content for the second container */}
      </div>
    </div>
  );
}

export default MyPro;
