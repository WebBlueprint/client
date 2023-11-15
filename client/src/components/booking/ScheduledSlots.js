import React from "react";
import styles from "../booking/booking.module.css";

const timeSlotsData = {
  MON: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "10:00 - 11:00" },
    { time: "11:00 - 12:00" },
    { time: "1:00 - 2:00" },
  ],
  TUE: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
  WED: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
  THU: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "10:00 - 11:00" },
  ],
  FRI: [
    { time: "13:00 - 14:00" },
    { time: "18:00 - 119:00" },
    { time: "20:00 - 21:00" },
  ],
  SAT: [
    { time: "8:00 - 9:00" },
    { time: "9:00 - 10:00" },
    { time: "16:00 - 17:00" },
  ],
  SUN: [
    { time: "13:00 - 14:00" },
    { time: "15:00 - 16:00" },
    { time: "17:00 - 18:00" },
  ],
};

function ScheduledSlots({ day }) {
  const timeSlots = timeSlotsData[day] || [];

  return (
    <div className={styles.scheduledSlots}>
      {timeSlots.map((slot, index) => (
        <div key={index} className={styles.slotContainer}>
          <div>{slot.time}</div>
        </div>
      ))}
    </div>
  );
}

export default ScheduledSlots;