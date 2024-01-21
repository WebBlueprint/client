// MyLesson_GroupLessons.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyLessonList.module.css";
import style from "./MyLessons.module.css";
import { Link } from "react-router-dom";
import NoneImage from "./NoneImage.svg";

const MyLesson_GroupLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All"); // 초기값 설정
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const user_Id = "user2";

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
    const fetchLessonsForUser = async () => {
      try {
        const response = await axios.get(
          `https://your-api-endpoint.com/lesson/groupLessons/${user_Id}`,
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        setLessons(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("fetchLessonsForUser에서 오류:", error);
        console.error("오류 응답 데이터:", error.response?.data);
        console.error("오류 요청 데이터:", error.request);
      }
    };

    fetchLessonsForUser();
  }, [user_Id, selectedMonth]); // selectedMonth를 의존성에 추가

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
    // 여기서 저장 또는 API 호출 수행
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
              return selectedMonth === "All" || lesson.reservation_date.includes(`${selectedMonth}-`);
            })
            .map((lesson) => (
              <div key={lesson._id} className={styles.myLessons}>
                <div className={`${styles.iconwrap} ${styles.greenBackground}`}></div>
                <div className={styles.text}>
                  <h2>{lesson.place.name}</h2>
                  <p>
                    {lesson.location.name} / {lesson.status}
                  </p>
                  <p>{lesson.reservation_date}</p>
                  <p>{lesson.remaining_lesson}</p>
                </div>
                <div className={styles.btnwrap}>
                  <button onClick={() => handleRescheduleClick(lesson)}>Reschedule</button>
                  <button>
                    <Link to={`/lessons/${lesson._id}`}>View Details</Link>
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
