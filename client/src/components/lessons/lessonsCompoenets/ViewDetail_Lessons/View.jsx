import React, { useState } from "react";
import style from "./View.module.css";
import ViewPro from "./ViewPro";

const View = ({ lessonId }) => {
  const [activeTab, setActiveTab] = useState("video");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>My Lessons Review</div>
      <div className={style.cover}>
        <div>
          <ViewPro />
        </div>

        <div className={style.ReviewText}>
          <div className={style.tabButtons}>
            <div
              className={activeTab === "video" ? style.tabActive : style.tab}
              onClick={() => handleTabClick("video")}
            >
              Video
            </div>
            <div
              className={activeTab === "photos" ? style.tabActive : style.tab}
              onClick={() => handleTabClick("photos")}
            >
              Photos
            </div>
            <div
              className={activeTab === "comments" ? style.tabActive : style.tab}
              onClick={() => handleTabClick("comments")}
            >
              Comments
            </div>
          </div>

          {activeTab === "video" && (
            <div className={style.imgboxList}>
              <div className={style.imgbox}>Video Content 1 for Lesson {lessonId}</div>
              <div className={style.imgbox}>Video Content 2 for Lesson {lessonId}</div>
              <div className={style.imgbox}>Video Content 3 for Lesson {lessonId}</div>
            </div>
          )}

          {activeTab === "photos" && (
            <div className={style.imgboxList}>
              <div className={style.imgbox1}>Photo 1 for Lesson {lessonId}</div>
              <div className={style.imgbox1}>Photo 2 for Lesson {lessonId}</div>
              <div className={style.imgbox1}>Photo 3 for Lesson {lessonId}</div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className={style.commentbox}>Comment content for Lesson {lessonId} goes here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
