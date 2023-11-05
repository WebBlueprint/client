import React, { useState, useEffect } from "react";
import MyLessonsData from "./MyLessonList.json"; // JSON 데이터 가져오기
import styles from "./MyLessonList.module.css";
import style from "./MyLessons.module.css";

import NoneImage from "./NoneImage.svg";

const MyLessons_PersonalLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // MyLessonList.json 파일에서 데이터 가져오기
    setLessons(MyLessonsData);
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  return (
    <div className={style.cover}>
      <div className={style.calendar}>
        {months.map((month, index) => (
          <div key={index} className={style.circle}>
            Pe {month}
          </div>
        ))}
      </div>

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
                <button>Reschedule</button>
                <button>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLessons_PersonalLessons;
