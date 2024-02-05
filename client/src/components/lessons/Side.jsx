// Side.jsx
import React, { useState } from "react";
import styles from "./Side.module.css";
import { ReactComponent as Menu1Icon } from "./menu1.svg";
import { ReactComponent as Menu2Icon } from "./menu2.svg";
import { ReactComponent as ReviewIcon } from "./ReviewIcon.svg";

export default function Side({ onTabClick, isPro }) {
  const [activeTab, setActiveTab] = useState("myList");

  const handleTabClick = (tabName) => {
    if (tabName === "myList" || (tabName === "myLessons") || (tabName === "proReviews" && isPro)) {
      onTabClick(tabName);
      setActiveTab(tabName);
    }
  };

  return (
    <div>
       <div>
      <div
        className={
          activeTab === "myList"
            ? `${styles.cover1} ${styles.active}`
            : styles.cover1
        }
        onClick={() => handleTabClick("myList")}
      >
        <div>
          <Menu1Icon fill={activeTab === "myList" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "myList" ? styles.activeText : null}>
          My List
        </div>
      </div>

      <div
        className={
          activeTab === "myLessons"
            ? `${styles.cover2} ${styles.active}`
            : styles.cover2
        }
        onClick={() => handleTabClick("myLessons")}
      >
        <div>
          <Menu2Icon fill={activeTab === "myLessons" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "myLessons" ? styles.activeText : null}>
          My Lessons
        </div>
      </div> 
      </div> 

      {isPro && (
        <div
          className={
            activeTab === "proReviews"
              ? `${styles.cover1} ${styles.active}`
              : styles.cover1
          }
          onClick={() => handleTabClick("proReviews")}
        >
          <div>
            <ReviewIcon fill={activeTab === "proReviews" ? "#1B4607" : "#D9D9D9"}  />
          </div>
          <div className={activeTab === "proReviews" ? styles.activeText : null}>
            Lesson Reviews
          </div>
        </div>
      )}
    </div>
  );
}
