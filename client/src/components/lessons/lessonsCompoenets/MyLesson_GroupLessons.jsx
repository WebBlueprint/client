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
  const [showWarning, setShowWarning] = useState(false);

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

  // Handle reschedule click
  const handleRescheduleClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
    
    // 선택한 레슨의 날짜를 Date 객체로 변환
    const selectedLessonDate = new Date(lesson.date);

    // 현재 시간에 12시간을 더한 시간을 설정
    const newDate = new Date(selectedLessonDate.getTime() + 12 * 60 * 60 * 1000);

    // 날짜 및 시간을 문자열로 변환하여 입력
    setNewDate(newDate.toISOString().slice(0, 10));
    setNewTime(newDate.toTimeString().slice(0, 5));
  };

  // Handle reschedule save
  const handleRescheduleSave = () => {
    setIsModalOpen(false);
    
    // 사용자가 선택한 새로운 날짜 및 시간을 Date 객체로 변환
    const selectedDate = new Date(newDate + "T" + newTime);

    // 현재 시간을 가져옴
    const currentTime = new Date();

    // 사용자가 선택한 시간이 현재 시간보다 이른 경우 알림 표시
    if (selectedDate < currentTime) {
      setShowWarning(true);
    } else {
      // 그렇지 않으면 저장 또는 API 호출 수행
      setShowWarning(false);
      // 저장 또는 API 호출 수행
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
            onClick={() => setSelectedMonth(month.value)}
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
                return <div className={styles.Loading} >No Group Lessons</div>;
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
            <label>Original Date:</label>
            <p>{selectedLesson && formatLessonDate(selectedLesson.date)}</p>
            <label>New Date:</label>
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <label>New Time:</label>
            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            {showWarning && <p style={{ color: 'red' }}>The selected date and time is earlier than the current time. Please select again.</p>}
            <button onClick={handleRescheduleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLesson_GroupLessons;
