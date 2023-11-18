import React, { useState } from "react";
import styles from "./Side.module.css";
import { ReactComponent as Menu1Icon } from "./menu1.svg";
import { ReactComponent as Menu2Icon } from "./menu2.svg";

export default function Side({ onTabClick }) {
  const [activeTab, setActiveTab] = useState("myList");

  const handleTabClick = (tabName) => {
    onTabClick(tabName);
    setActiveTab(tabName);
  };

  return (
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

      <div
        className={
          activeTab === "LessonReviews"
            ? `${styles.cover1} ${styles.active}`
            : styles.cover1
        }
        onClick={() => handleTabClick("LessonReviews")}
      >
        <div>
          <Menu1Icon fill={activeTab === "LessonReviews" ? "#1B4607" : "#D9D9D9"} />
        </div>
        <div className={activeTab === "LessonReviews" ? styles.activeText : null}>
          Lesson Reviews
        </div>
      </div>


    </div>
  );
}
