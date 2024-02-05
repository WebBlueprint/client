// Lessons.jsx
import styles from "./Lessons.module.css";
import Side from "./Side";
import LessonsHeader from "./LessonsHeader";
import MyList from "./lessonsCompoenets/MyList";
import MyLessons from "./lessonsCompoenets/MyLessons";

import React, { useState } from "react";
import ProReviewSend from "./ProReviewSend";

export default function Setting() {
  const [isPro, setIsPro] = useState(true); // 초기 pro 여부 설정
  const [selectedTab, setSelectedTab] = useState("myList"); // 초기 탭 설정

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleToggleProUser = () => {
    setIsPro((prevIsPro) => !prevIsPro);
  };

  return (
    <div className={styles.appsin}>
      <div>
        <LessonsHeader isPro={isPro} onToggleProUser={handleToggleProUser} />
      </div>
      <div className={styles.settingbody}>
        <div>
          <Side onTabClick={handleTabClick} isPro={isPro} />
        </div>
        <div>
          {selectedTab === "myList" && <MyList />}
          {selectedTab === "myLessons" && <MyLessons />}
          {selectedTab === "proReviews" && isPro && <ProReviewSend />}
        </div>
      </div>
    </div>
  );
}
