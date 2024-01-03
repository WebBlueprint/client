import React, { useState } from "react";
import styles from "../booking/booking.module.css";
import proImage from "./pro.png";

function MyPro({ name, lesson, onItemClick, isActive }) {
  const handleCoverClick = () => {
    onItemClick();
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.Procontainer}>
        KLGCC - Kuala Lumpur 
        <div> Golf & Country Club,
        </div>
        <div> Bukit Kiara </div> 
        <div className={styles.additionalText}>
        KLGCC - Tournament Players Club 
        <div> (TPC) Bukit Kiara </div>
        </div>
      </div>
      <div className={styles.Procontainer2}>
      <img src={proImage} alt="Pro Image" className={styles.proImage} />
      <div className={styles.Proname} > Pro Name </div>
      <div className={styles.reaminglesson} > Reaming 10 Lessons (10/20)  </div>
      </div>
    </div>
  );
}

export default MyPro;
