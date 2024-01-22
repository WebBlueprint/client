import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyLessonList.module.css";
import style from "./MyLessons.module.css";  // Assuming this is the correct style import
import { Link } from "react-router-dom";
import NoneImage from "./NoneImage.svg";

const MyLesson_GroupLessons = () => {
  // State variables
  const [lessons, setLessons] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [user_Id] = useState("user1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonthKey, setSelectedMonthKey] = useState(null);


  // Array of months
  const months = [
    { label: "All", value: "All" },
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 }
  ];

  // Fetch lessons for the user
  useEffect(() => {
    const fetchLessonsForUser = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await axios.get(
          `https://p-match-ec61fc56d612.herokuapp.com/lesson/group-lessons/${user_Id}`,
          {
            timeout: 5000,
          }
        );
  
        setLessons(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("fetchLessonsForUser에서 오류:", error);
        console.error("오류 응답 데이터:", error.response?.data);
        console.error("오류 요청 데이터:", error.request);
  
        setError("Failed to fetch lessons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLessonsForUser();

  }, [user_Id, selectedMonth]);

  // Format lesson date
  const formatLessonDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const handleMonthClick = (monthValue, monthKey) => {
    setSelectedMonth(monthValue);
    setSelectedMonthKey(monthKey);
  };

  // Handle reschedule click
  const handleRescheduleClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle reschedule save
  const handleRescheduleSave = () => {
    setIsModalOpen(false);
    // 여기서 저장 또는 API 호출 수행
  };

  const isMonthSelected = (monthValue) => {
    const isSelected = selectedMonth === monthValue;
    const selectedClass = isSelected ? `${styles.selectedMonth} ${styles.greenBackground}` : styles.nonSelectedMonth;
  
    return selectedClass;
  };

  return (
    <div className={style.cover}>
      <div className={style.calendar}>
        {months.map((month) => (
          <div
            key={month.value}
            className={`${isMonthSelected(month.value)}`}
            onClick={() => handleMonthClick(month.value, month.value)}
          >
            {month.label}
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
          {loading ? (
            <div  className={styles.Loading} >Loading...</div>
          ) : (
            (() => {
              const filteredLessons = lessons
                .filter((lesson) => {
                  if (selectedMonth === "All") {
                    return true;
                  }
                  const lessonMonth = new Date(lesson.date).getMonth() + 1;
                  return lessonMonth === Number(selectedMonth);
                });
  
              if (filteredLessons.length === 0) {
                return <div >No Group Lessons</div>;
              }
  
              return filteredLessons.map((lesson) => (
                <div key={lesson._id} className={styles.myLessons}>
                  <div className={styles.iconwrap}></div>
                  <div className={styles.text}>
                    <h2>{lesson.proName}</h2>
                    <p>
                      {lesson.location} / <b> {lesson.status} </b>
                    </p>
                    <p>{formatLessonDate(lesson.date)}</p>
                    <p>Remaining Lesson : {lesson.remaining_lesson}</p>
                  </div>
                  <div className={styles.btnwrap}>
                    <button onClick={() => handleRescheduleClick(lesson)}>Reschedule</button>
                    <button>
                      <Link to={`/lessons/${lesson._id}`}>View Details</Link>
                    </button>
                  </div>
                </div>
              ));
            })()
          )}
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
