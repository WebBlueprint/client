import React from "react";
import LessonHeader from "../block/Header/Header";
import styles from "../booking/booking.module.css";
import MyPro from "../booking/MyPro";

function Booking() {
  return (
    <>
      <div className={styles.lessonContainer}>
        <LessonHeader />
      </div>
      <p className={styles.upcomingt}> My Upcoming Lessons </p> {}
      <div className={styles.cover2}>
        <p className={styles.viewprot}> View All My Pro </p> {}
        <div className={styles.proCover}>
          <MyPro />
          <MyPro />
        </div>
      </div>
    </>
  );
}

export default Booking;