import styles from "./Lessons.module.css";
import Side from "./Side";
import LessonsHeader from "./LessonsHeader";
import MyList from "./lessonsCompoenets/MyList";
import MyLessons from "./lessonsCompoenets/MyLessons";

import React, { useState } from "react";
import ProReviewSend from "./ProReviewSend";

export default function Setting() {
  const [selectedTab, setSelectedTab] = useState("myList"); // 초기 탭 설정

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className={styles.appsin}>
      <div>
        <LessonsHeader />
      </div>
      <div className={styles.settingbody}>
        <div>
          <Side onTabClick={handleTabClick} />
        </div>
        <div>
          {selectedTab === "myList" && <MyList />}
          {selectedTab === "myLessons" && <MyLessons />}
          {selectedTab === "LessonReviews" && <ProReviewSend />}
        </div>
      </div>
    </div>
  );
}
