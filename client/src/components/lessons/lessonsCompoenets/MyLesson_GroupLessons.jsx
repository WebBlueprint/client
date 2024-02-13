import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyLessonList.module.css";
import style from "./MyLessons.module.css";
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
        console.error("Error occurred in fetchLessonsForUser:", error);
        console.error("Error response data:", error.response?.data);
        console.error("Error request data:", error.request);

        setError("Failed to fetch lessons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsForUser();

  }, [user_Id, selectedMonth]);

  // Handle reschedule click
  const handleRescheduleClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);

    // Select the lesson's date as default
    const selectedLessonDate = new Date(lesson.date);

    // Add 3 days to the selected date
    selectedLessonDate.setDate(selectedLessonDate.getDate() + 3);

    // Convert the date to string for input
    setNewDate(selectedLessonDate.toISOString().slice(0, 10));
    setNewTime(selectedLessonDate.toTimeString().slice(0, 5));
  };

// Handle reschedule save
const handleRescheduleSave = async () => {
  setIsModalOpen(false);

  // Convert the selected new date and time to a Date object
  const selectedDate = new Date(newDate + "T" + newTime);

  // Get the current time
  const currentTime = new Date();

  // Show warning if the selected time is earlier than the current time
  if (selectedDate < currentTime) {
    setShowWarning(true);
  } else {
    // Otherwise, send the rescheduling request to the server
    setShowWarning(false);
    try {
      const response = await axios.post('https://p-match-ec61fc56d612.herokuapp.com/lesson/reschedule', {
        reservationId: selectedLesson._id,
        newDate: selectedDate.toISOString().slice(0, 10), // Correctly format newDate
        newTime: selectedDate.toTimeString().slice(0, 5) // Correctly format newTime
      });
      
      if (response.status === 200) {
        // Update the local state with the new date and time
        const updatedLessons = lessons.map((lesson) => {
          if (lesson._id === selectedLesson._id) {
            return { ...lesson, date: selectedDate.toISOString().slice(0, 10) }; // Update the date
          }
          return lesson;
        });
        setLessons(updatedLessons);
      }

      console.log(selectedDate.toISOString().slice(0, 10));
      // Optionally, you can update the local state here to reflect the changes immediately
    } catch (error) {
      console.error('Error occurred while rescheduling lesson:', error);
      // Handle error
    }
  }
};

  const handleModalClose = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
    setNewDate("");
    setNewTime("");
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
                    <p>{lesson.date}</p> {/* Display original date */}
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
            <p>{selectedLesson && selectedLesson.date}</p>
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
