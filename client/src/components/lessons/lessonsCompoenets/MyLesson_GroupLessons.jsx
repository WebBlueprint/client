import React, { useState, useEffect } from "react";
import MyLessonsData from "./MyLessonList.json";
import styles from "./MyLessonList.module.css";
import style from "./MyLessons.module.css";
import { Link } from "react-router-dom";
import NoneImage from "./NoneImage.svg";

const MyLesson_GroupLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const months = [
    "All",
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
  
  useEffect(() => {
    setLessons(MyLessonsData);
  }, []);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleRescheduleClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRescheduleSave = () => {
    // Implement logic to save the new date and time
    // Check if the modification is allowed (e.g., 24 hours after the current time)
    // Update the lessons array with the modified lesson
    setIsModalOpen(false);
  };

  return (
    <div className={style.cover}>
      <div className={style.calendar}>
        {months.map((month, index) => (
          <div
            key={index}
            className={`${style.circle} ${
              selectedMonth === month ? style.selectedMonth : ""
            }`}
            onClick={() => handleMonthClick(month)}
          >
            {month}
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
          {lessons
            .filter((lesson) => {
              return selectedMonth === "All" || lesson.date.includes(`${selectedMonth}-`);
            })
            .map((lesson) => (
              <div key={lesson.id} className={styles.myLessons}>
                <div className={`${styles.iconwrap} ${styles.greenBackground}`}></div>
                <div className={styles.text}>
                  <h2>{lesson.title}</h2>
                  <p>
                    {lesson.status} / {lesson.instructor}
                  </p>
                  <p>
                    {lesson.date} / {lesson.time}
                  </p>
                  <p>{lesson.remaining}</p>
                </div>
                <div className={styles.btnwrap}>
                  <button onClick={() => handleRescheduleClick(lesson)}>Reschedule</button>
                  <button>
                    <Link to={`/lessons/1`}>View Details</Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleModalClose}>
              &times;
            </span>
            <h2>Reschedule Lesson</h2>
            <label>New Date:</label>
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <label>New Time:</label>
            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            <button onClick={handleRescheduleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLesson_GroupLessons;
