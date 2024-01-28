import React, { useState } from "react";
import styles from "../booking/booking.module.css";
import ScheduledSlots from "./ScheduledSlots";

const daydata = [
  { day: "MON", date: "20" },
  { day: "TUE", date: "21" },
  { day: "WED", date: "22" },
  { day: "THU", date: "23" },
  { day: "FRI", date: "24" },
  { day: "SAT", date: "25" },
  { day: "SUN", date: "26" }
];

function Schedule() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    setSelectedDay((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className={`${styles.Scover}`}>
        <div className={`${styles.Scontainer}`}>
          {daydata.map((day, index) => (
            <div
              className={`${styles.day} ${
                selectedDay === index ? styles.clicked : ""
              }`}
              key={index}
              onClick={() => handleDayClick(index)}
            >
              <h3>{day.day}</h3>
              <p>{day.date}</p>
            </div>
          ))}
        </div>
      {selectedDay !== null && (
        <ScheduledSlots day={daydata[selectedDay].day} />
      )}
      </div>
    </div>
  );
}

export default Schedule;
