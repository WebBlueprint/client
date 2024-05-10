//LessonMain.jsx
import React, { useState } from "react";
import LessonsHeader from "./LessonsHeader";
import MyLessons from "../lessons/MyLessons";
import styles from "../lessons/Lessons.module.css";

const LessonsMain = () => {
  const [isPro, setIsPro] = useState(true);

  const handleTabClick = (tabName) => {
    // Your tab click logic here
  };

  return (
    <div className={styles.appsin}>
    <div className={styles.cover}>
      <LessonsHeader isPro={isPro} />
      <MyLessons />
      </div>
    </div>
  );
};

export default LessonsMain;
