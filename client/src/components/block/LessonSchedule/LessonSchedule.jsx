import React, { useState, useEffect } from "react";
import MyLessonsData from "./MyLessonsData.json";
import styles from "./LessonSchedule.module.css";
import NoneImage from "./None.svg";

const LessonSchedule = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // MyLessonsData를 그대로 사용
    setLessons(MyLessonsData);
  }, []);

  return (
    <div>
      <div className={styles.griddisplay}>
        <div className={styles.grid1}>
          <div className={styles.iconwrap2}>
            <img src={NoneImage} alt="None" className={styles.non} />
          </div>
        </div>

        <div className={styles.grid2}>
          {lessons.map((lesson) => (
            <div key={lesson.id} className={styles.myLessons}>
              <div className={styles.iconwrap}></div>
              <div className={styles.text}>
                <h2>{lesson.title}</h2>
                <p>{lesson.instructor}</p>
                <p>{lesson.date}</p>
                <p>{lesson.time}</p>
                <p>{lesson.remaining}</p>
                <p>{lesson.status}</p>
              </div>
              <div className={styles.btnwrap}>
                <button> Reschedule </button>
                <button> View Details </button>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default LessonSchedule;
