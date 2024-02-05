// LessonsHeader.jsx
import styles from "./LessonsHeader.module.css";
import LessonsIcon from "./LessonsIcon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const LessonsHeader = ({ isPro, onToggleProUser }) => {
  const handleToggleProUser = () => {
    if (typeof onToggleProUser === 'function') {
      onToggleProUser();
    }
  };

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.maintext}>
          <button onClick={handleToggleProUser} className={` ${styles.round} ${isPro ? styles.pro : ''}`} >{isPro ? "Pros" : "User"}</button>
          <div className={styles.text}>
            {" "}
            <span>Hello, Mr.Lee </span>{" "}
          </div>
        </div>

        <div className={styles.sidetext}>
          <div className={styles.sidetext1}> Location: KL </div>
          <div> Gender: M </div>
        </div>

        <div>
          {/* Link to setting */}
          <Link to="/setting">
            <img src={LessonsIcon} className={styles.imgicon} alt="Lessons Icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonsHeader;
